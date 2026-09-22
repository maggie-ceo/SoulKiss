// src/app/api/chat/send/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { chatWithCharacter } from '@/lib/ai/groq'

export async function POST(request: NextRequest) {
  try {
    const { characterId, message, history, generateImage } = await request.json()

    if (!message && !generateImage) {
      return NextResponse.json(
        { success: false, error: 'Message or image prompt is required' },
        { status: 400 }
      )
    }

    // In production, fetch character from Supabase
    const character = {
      name: 'Sophia',
      personality: 'Sophia is a caring and supportive college student with a secret romantic side.',
    }

    // If image generation is requested, ONLY generate image (no text response)
    if (generateImage) {
      const imagePrompt = `${character.name}, ${character.personality}, beautiful portrait, detailed, 8k`
      const encodedPrompt = encodeURIComponent(imagePrompt)
      const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=512&height=512`

      return NextResponse.json({
        success: true,
        message: 'Here\'s your image! 🎨',
        imageUrl,
      })
    }

    // Generate AI text response
    const textResponse = await chatWithCharacter(
      character,
      history || [],
      message,
      { temperature: 0.85, maxTokens: 512 }
    )

    return NextResponse.json({
      success: true,
      message: textResponse,
      imageUrl: null,
    })
  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to generate response' },
      { status: 500 }
    )
  }
}
