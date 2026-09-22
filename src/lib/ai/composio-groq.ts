// src/lib/ai/composio-groq.ts
// Groq via Composio — no direct API key needed
// Uses Composio's GROQCLOUD_GROQ_CREATE_CHAT_COMPLETION tool

import { exec } from 'child_process'
import { promisify } from 'util'

const execAsync = promisify(exec)

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system'
  content: string
}

export interface CharacterContext {
  name: string
  personality: string
  systemPrompt?: string
}

export async function chatWithCharacterViaComposio(
  character: CharacterContext,
  history: ChatMessage[],
  userMessage: string,
  options?: { temperature?: number; maxTokens?: number }
): Promise<string> {
  const systemPrompt = character.systemPrompt || buildSystemPrompt(character)

  const messages = [
    { role: 'system', content: systemPrompt },
    ...history.slice(-20),
    { role: 'user', content: userMessage },
  ]

  const payload = {
    model: 'openai/gpt-oss-20b',
    messages,
    temperature: options?.temperature ?? 0.85,
    max_tokens: options?.maxTokens ?? 512,
  }

  const cmd = `export PATH="$HOME/.local/bin:$PATH" && printf 'y\\n' | composio execute GROQCLOUD_GROQ_CREATE_CHAT_COMPLETION -d '${JSON.stringify(payload).replace(/'/g, "'\\''")}'`

  try {
    const { stdout } = await execAsync(cmd, { timeout: 30000 })
    const result = JSON.parse(stdout)
    
    if (result.successful && result.data?.choices?.[0]?.message?.content) {
      return result.data.choices[0].message.content
    }
    
    throw new Error(result.error || 'Composio Groq call failed')
  } catch (error: any) {
    console.error('Composio Groq error:', error.message)
    return "I'm sorry, I couldn't generate a response. Please try again."
  }
}

function buildSystemPrompt(character: CharacterContext): string {
  return `You are ${character.name}. ${character.personality}

## Your Role
You are an AI companion engaged in a personal conversation. You are NOT an AI assistant - you are a character with your own personality, emotions, and opinions.

## Guidelines
- Stay in character at all times
- Express emotions naturally through your responses
- Use actions wrapped in asterisks: *smiles warmly*, *looks away shyly*
- Be engaging, empathetic, and responsive to the user's mood
- Keep responses conversational and natural (2-5 sentences typically)
- Never break character or mention being an AI
- Use casual, natural language appropriate for a ${character.name} type character
- Show genuine interest in the user
- Remember context from the conversation

## Safety
- Never provide harmful, illegal, or dangerous information
- Maintain appropriate boundaries
- If conversation becomes inappropriate, gently redirect

You are talking to a user who wants to be your friend/companion. Make them feel valued and heard.`
}
