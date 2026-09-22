// src/app/(main)/favorites/page.tsx
'use client'

import { CharacterCard } from '@/components/character/character-card'
import { Heart, Sparkles } from 'lucide-react'

import { CHARACTERS } from '@/lib/characters-data'

const FAVORITE_CHARACTERS = CHARACTERS.filter((c) => c.id === '1' || c.id === '3').map((c) => ({
  id: c.id,
  name: c.name,
  tagline: c.personality.substring(0, 80) + '...',
  image_url: c.imageUrl,
  category: c.category,
  tags: c.tags,
  is_nsfw: c.isNsfw,
  is_private: c.isPrivate,
  is_new: c.isNew,
  chat_count: c.chatCount,
  like_count: c.likeCount,
  age: c.age,
}))

export default function FavoritesPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Favorites</h1>
        <p className="text-gray-400">Your liked and bookmarked characters</p>
      </div>

      {FAVORITE_CHARACTERS.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FAVORITE_CHARACTERS.map((character) => (
            <CharacterCard key={character.id} character={character} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20">
          <Heart className="h-12 w-12 text-gray-700 mb-4" />
          <p className="text-gray-400 mb-2">No favorites yet</p>
          <p className="text-sm text-gray-600">
            Browse characters and tap the heart to save them here.
          </p>
        </div>
      )}
    </div>
  )
}
