// src/app/page.tsx
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Search, ChevronRight, Play } from 'lucide-react'
import Link from 'next/link'
import { CharacterCard } from '@/components/character/character-card'
import { CHARACTERS } from '@/lib/characters-data'

const CATEGORIES = [
  { id: 'girls', label: 'Girls', icon: '👩' },
  { id: 'anime', label: 'Anime', icon: '🎭' },
  { id: 'guys', label: 'Guys', icon: '👨' },
]

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'private', label: 'Private Content' },
  { id: 'caucasian', label: 'Caucasian' },
  { id: 'latina', label: 'Latina' },
  { id: 'asian', label: 'Asian' },
  { id: '18-21', label: '18-21' },
  { id: 'blonde', label: 'Blonde' },
  { id: 'brunette', label: 'Brunette' },
  { id: 'redhead', label: 'Redhead' },
  { id: 'milf', label: 'Milf' },
]

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState('girls')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredCharacters = CHARACTERS.filter((char) => {
    const matchesCategory = activeCategory === 'all' || char.category === activeCategory
    const matchesSearch =
      searchQuery === '' ||
      char.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      char.tags.some((t) => t.includes(searchQuery.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Hero Banner */}
      <section className="relative overflow-hidden border-b border-gray-800">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-900/30 via-purple-900/20 to-blue-900/30" />
        <div className="relative mx-auto max-w-7xl px-4 py-12 lg:py-16">
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-pink-500/20 px-4 py-1.5 text-sm text-pink-400 ring-1 ring-pink-500/30">
              Limited Time Offer
            </div>
            <h1 className="mb-2 text-4xl font-bold text-white lg:text-5xl">
              Back to <span className="text-pink-500">SCHOOL</span> SALE
            </h1>
            <p className="mb-6 text-2xl font-bold text-yellow-400 lg:text-3xl">
              SALE 70% OFF
            </p>
            <Link href="/register">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg font-semibold">
                JOIN NOW
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Category Tabs */}
      <div className="border-b border-gray-800 bg-gray-900/50">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex gap-8">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`py-4 text-sm font-medium transition-colors border-b-2 ${
                  activeCategory === cat.id
                    ? 'border-pink-500 text-pink-500'
                    : 'border-transparent text-gray-400 hover:text-white'
                }`}
              >
                {cat.icon} {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">
            Explore Featured Characters <ChevronRight className="inline h-6 w-6" />
          </h2>
        </div>

        <div className="mb-6 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Search characters..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-10 w-full rounded-lg border border-gray-800 bg-gray-900 pl-10 pr-4 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {FILTERS.map((filter) => (
              <button
                key={filter.id}
                className="rounded-full px-4 py-1.5 text-sm font-medium bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white transition-colors"
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Character Grid */}
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          {filteredCharacters.map((character) => (
            <CharacterCard 
              key={character.id} 
              character={{
                id: character.id,
                name: character.name,
                age: character.age,
                tagline: character.personality.substring(0, 80) + '...',
                image_url: character.imageUrl,
                avatar_url: character.imageUrl,
                category: character.category,
                tags: character.tags,
                is_nsfw: character.isNsfw,
                is_private: character.isPrivate,
                is_new: character.isNew,
                chat_count: character.chatCount,
                like_count: character.likeCount,
              }} 
            />
          ))}
        </div>

        {filteredCharacters.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400">No characters found matching your search.</p>
          </div>
        )}

        <div className="mt-8 text-center">
          <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800">
            Load More Characters
          </Button>
        </div>
      </div>

      {/* Shorts Section */}
      <section className="border-t border-gray-800 bg-gray-900/30 py-12">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="mb-6 text-2xl font-bold text-white">
            SoulKiss Shorts <ChevronRight className="inline h-6 w-6" />
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="group relative aspect-video rounded-lg bg-gray-800 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Play className="h-12 w-12 text-white/50 group-hover:text-white/80 transition-colors" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                  <p className="text-sm text-white">Short Video #{i}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
