// src/app/api/image/generate/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { generateImagePrompt } from '@/lib/ai/groq'

export async function POST(request: NextRequest) {
  try {
    const { character, context } = await request.json()

    if (!character) {
      return NextResponse.json(
        { success: false, error: 'Character data is required' },
        { status: 400 }
      )
    }

    // Generate prompt using Groq
    const prompt = await generateImagePrompt(character, context || 'portrait')

    // In production, call HuggingFace or Replicate API
    // For now, return the prompt for testing
    return NextResponse.json({
      success: true,
      prompt,
      image_url: null, // Would be the generated image URL
      message: 'Image generation ready. Connect HuggingFace API for actual generation.',
    })
  } catch (error) {
    console.error('Image generation error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to generate image prompt' },
      { status: 500 }
    )
  }
}
