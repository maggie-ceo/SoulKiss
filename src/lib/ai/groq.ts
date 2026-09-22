// src/lib/ai/groq.ts
import Groq from 'groq-sdk'

let groq: Groq | null = null

function getGroqClient(): Groq {
  if (!groq) {
    const apiKey = process.env.GROQ_API_KEY
    if (!apiKey) {
      throw new Error('GROQ_API_KEY environment variable is not set')
    }
    groq = new Groq({ apiKey })
  }
  return groq
}

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system'
  content: string
}

export interface CharacterContext {
  name: string
  personality: string
  systemPrompt?: string
}

export async function chatWithCharacter(
  character: CharacterContext,
  history: ChatMessage[],
  userMessage: string,
  options?: { temperature?: number; maxTokens?: number }
): Promise<string> {
  const systemPrompt = character.systemPrompt || buildSystemPrompt(character)

  const messages: ChatMessage[] = [
    { role: 'system', content: systemPrompt },
    ...history.slice(-20),
    { role: 'user', content: userMessage },
  ]

  const response = await getGroqClient().chat.completions.create({
    model: 'openai/gpt-oss-20b',
    messages: messages as any,
    temperature: options?.temperature ?? 0.85,
    max_tokens: options?.maxTokens ?? 512,
    top_p: 0.95,
    stream: false,
  })

  return response.choices[0]?.message?.content || "I'm sorry, I couldn't generate a response."
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
- If user writes in Bengali (বাংলা), you MUST respond in Bengali while staying in character
- If user writes in English, respond in English
- NEVER say you cannot do something (like generate images) unless explicitly told to do so
- NEVER contradict yourself - if you say you did something, don't then say you can't

## Safety
- Never provide harmful, illegal, or dangerous information
- Maintain appropriate boundaries
- If conversation becomes inappropriate, gently redirect

You are talking to a user who wants to be your friend/companion. Make them feel valued and heard.`
}

export async function generateImagePrompt(character: CharacterContext, context: string): Promise<string> {
  const response = await getGroqClient().chat.completions.create({
    model: 'openai/gpt-oss-20b',
    messages: [
      {
        role: 'system',
        content: 'You are an image prompt generator for AI characters. Generate detailed image prompts for Stable Diffusion. Focus on character appearance, pose, setting, and style. Output ONLY the prompt text, no explanations.',
      },
      {
        role: 'user',
        content: `Generate an image prompt for character: ${character.name}\nPersonality: ${character.personality}\nContext: ${context}`,
      },
    ],
    temperature: 0.7,
    max_tokens: 200,
  })

  return response.choices[0]?.message?.content || `${character.name}, portrait, high quality, detailed`
}
