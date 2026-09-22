// src/app/(main)/discover/page.tsx
'use client'

import { useState } from 'react'
import { CharacterCard } from '@/components/character/character-card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Search, Filter, Sparkles } from 'lucide-react'
import { CATEGORIES } from '@/lib/utils'

// Sample data - in production this comes from API
import { CHARACTERS } from '@/lib/characters-data'

const SAMPLE_CHARACTERS = CHARACTERS.map((c) => ({
  id: c.id,
  name: c.name,
  tagline: c.personality.substring(0, 80) + '...',
  description: c.personality,
  image_url: c.imageUrl,
  category: c.category,
  tags: c.tags,
  is_nsfw: c.isNsfw,
  is_private: c.isPrivate,
  is_new: c.isNew,
  chat_count: c.chatCount,
  like_count: c.likeCount,
  age: c.age,
  avatar_url: c.imageUrl,
}))

export default function DiscoverPage() {
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const filteredCharacters = SAMPLE_CHARACTERS.filter((char) => {
    const matchesSearch =
      search === '' ||
      char.name.toLowerCase().includes(search.toLowerCase()) ||
      char.tags.some((t) => t.includes(search.toLowerCase()))
    const matchesCategory = selectedCategory === 'all' || char.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Discover Characters</h1>
        <p className="text-gray-400">
          Find your perfect AI companion from thousands of unique characters
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mb-8 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
          <Input
            type="text"
            placeholder="Search by name or tag..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 bg-gray-900 border-gray-800"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              selectedCategory === 'all'
                ? 'bg-pink-600 text-white'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            All
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                selectedCategory === cat.id
                  ? 'bg-pink-600 text-white'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              {cat.icon} {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Character Grid */}
      {filteredCharacters.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredCharacters.map((character) => (
            <CharacterCard key={character.id} character={character} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20">
          <Sparkles className="h-12 w-12 text-gray-700 mb-4" />
          <p className="text-gray-400">No characters found matching your search.</p>
        </div>
      )}
    </div>
  )
}
