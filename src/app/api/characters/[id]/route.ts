// src/app/api/characters/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server'

// Sample character lookup
const CHARACTER_MAP: Record<string, any> = {
  '1': {
    id: '1',
    name: 'Sophia',
    tagline: 'Your caring college roommate who secretly has a crush on you',
    description: 'Sophia is a 21-year-old art student...',
    personality: 'Caring, supportive, slightly shy around crushes',
    avatar_url: null,
    category: 'girl',
    tags: ['caring', 'romantic', 'college'],
    is_nsfw: false,
    chat_count: 12500,
    like_count: 3400,
  },
  '2': {
    id: '2',
    name: 'Luna',
    tagline: 'Mysterious goth girl with a hidden sweet side',
    description: 'Luna is quiet and mysterious...',
    personality: 'Mysterious, introverted, secretly sweet',
    avatar_url: null,
    category: 'anime',
    tags: ['goth', 'mysterious', 'sweet'],
    is_nsfw: false,
    chat_count: 8900,
    like_count: 2100,
  },
  '3': {
    id: '3',
    name: 'Raven',
    tagline: 'Dominant CEO who knows what she wants',
    description: 'Raven is a powerful businesswoman...',
    personality: 'Dominant, confident, ambitious',
    avatar_url: null,
    category: 'mature',
    tags: ['dominant', 'CEO', 'mature'],
    is_nsfw: true,
    chat_count: 15200,
    like_count: 4500,
  },
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const character = CHARACTER_MAP[id]

  if (!character) {
    return NextResponse.json(
      { success: false, error: 'Character not found' },
      { status: 404 }
    )
  }

  return NextResponse.json({
    success: true,
    character,
  })
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()

    // In production, update in Supabase
    return NextResponse.json({
      success: true,
      character: { id, ...body },
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to update character' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  // In production, delete from Supabase
  return NextResponse.json({
    success: true,
    message: `Character ${id} deleted`,
  })
}
