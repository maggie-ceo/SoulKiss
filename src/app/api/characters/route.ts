// src/app/api/characters/route.ts
import { NextRequest, NextResponse } from 'next/server'

// In production, this would use Supabase
// For now, return sample data

const SAMPLE_CHARACTERS = [
  {
    id: '1',
    creator_id: null,
    name: 'Sophia',
    tagline: 'Your caring college roommate who secretly has a crush on you',
    description: 'Sophia is a 21-year-old art student with a warm personality. She loves painting, indie music, and late-night conversations. She has a secret crush on you but tries to hide it behind her cheerful demeanor.',
    personality: 'Caring, supportive, slightly shy around crushes, creative, empathetic',
    system_prompt: null,
    avatar_url: null,
    banner_url: null,
    category: 'girl',
    tags: ['caring', 'romantic', 'college', 'art'],
    is_public: true,
    is_nsfw: false,
    is_featured: true,
    chat_count: 12500,
    like_count: 3400,
    message_count: 0,
    rating: 4.8,
    rating_count: 1200,
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-01-15T10:00:00Z',
  },
  {
    id: '2',
    creator_id: null,
    name: 'Luna',
    tagline: 'Mysterious goth girl with a hidden sweet side',
    description: 'Luna is quiet and mysterious. She wears all black, reads poetry, and has a secret love for cute things.',
    personality: 'Mysterious, introverted, secretly sweet, artistic, deep',
    system_prompt: null,
    avatar_url: null,
    banner_url: null,
    category: 'anime',
    tags: ['goth', 'mysterious', 'sweet', 'poetry'],
    is_public: true,
    is_nsfw: false,
    is_featured: true,
    chat_count: 8900,
    like_count: 2100,
    message_count: 0,
    rating: 4.6,
    rating_count: 890,
    created_at: '2024-01-20T10:00:00Z',
    updated_at: '2024-01-20T10:00:00Z',
  },
  {
    id: '3',
    creator_id: null,
    name: 'Raven',
    tagline: 'Dominant CEO who knows what she wants',
    description: 'Raven is a powerful businesswoman who commands every room she enters. She knows what she wants and goes after it.',
    personality: 'Dominant, confident, ambitious, direct, sophisticated',
    system_prompt: null,
    avatar_url: null,
    banner_url: null,
    category: 'mature',
    tags: ['dominant', 'CEO', 'mature', 'confident'],
    is_public: true,
    is_nsfw: true,
    is_featured: true,
    chat_count: 15200,
    like_count: 4500,
    message_count: 0,
    rating: 4.9,
    rating_count: 2100,
    created_at: '2024-02-01T10:00:00Z',
    updated_at: '2024-02-01T10:00:00Z',
  },
]

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category')
  const search = searchParams.get('search')
  const featured = searchParams.get('featured')

  let characters = SAMPLE_CHARACTERS

  if (category && category !== 'all') {
    characters = characters.filter((c) => c.category === category)
  }

  if (search) {
    const searchLower = search.toLowerCase()
    characters = characters.filter(
      (c) =>
        c.name.toLowerCase().includes(searchLower) ||
        c.tags.some((t) => t.includes(searchLower))
    )
  }

  if (featured === 'true') {
    characters = characters.filter((c) => c.is_featured)
  }

  return NextResponse.json({
    success: true,
    characters,
    total: characters.length,
  })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, tagline, description, personality, category, tags, is_nsfw } = body

    if (!name) {
      return NextResponse.json(
        { success: false, error: 'Name is required' },
        { status: 400 }
      )
    }

    // In production, save to Supabase
    const newCharacter = {
      id: Date.now().toString(),
      creator_id: null,
      name,
      tagline: tagline || null,
      description: description || null,
      personality: personality || null,
      system_prompt: null,
      avatar_url: null,
      banner_url: null,
      category: category || 'original',
      tags: tags || [],
      is_public: true,
      is_nsfw: is_nsfw || false,
      is_featured: false,
      chat_count: 0,
      like_count: 0,
      message_count: 0,
      rating: 0,
      rating_count: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    return NextResponse.json({
      success: true,
      character: newCharacter,
    })
  } catch (error) {
    console.error('Create character error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create character' },
      { status: 500 }
    )
  }
}
