// src/components/character/character-card.tsx
'use client'

import Link from 'next/link'
import { formatNumber } from '@/lib/utils'
import { Lock, Sparkles } from 'lucide-react'
import { CharacterAvatarCard } from './avatar'

interface CharacterCardProps {
  character: {
    id: string
    name: string
    age?: number
    tagline?: string
    image_url?: string
    avatar_url?: string
    category: string
    tags: string[]
    is_nsfw?: boolean
    isNsfw?: boolean
    is_private?: boolean
    isPrivate?: boolean
    is_new?: boolean
    isNew?: boolean
    chat_count: number
    like_count: number
  }
}

export function CharacterCard({ character }: CharacterCardProps) {
  const isNsfw = character.is_nsfw ?? character.isNsfw ?? false
  const isPrivate = character.is_private ?? character.isPrivate ?? false
  const isNew = character.is_new ?? character.isNew ?? false

  return (
    <Link href={`/chat/${character.id}`}>
      <div className="group cursor-pointer overflow-hidden rounded-xl bg-gray-900 transition-all hover:ring-2 hover:ring-pink-500 hover:scale-[1.02]">
        {/* Avatar */}
        <div className="relative aspect-[3/4] overflow-hidden">
          <CharacterAvatarCard 
            name={character.name} 
            category={character.category} 
            size="md"
          />
          
          {/* Badges */}
          <div className="absolute left-2 top-2 flex flex-col gap-1 z-10">
            {isNew && (
              <span className="rounded bg-pink-600 px-2 py-0.5 text-xs font-bold text-white shadow-lg">
                NEW
              </span>
            )}
            {isNsfw && (
              <span className="rounded bg-red-600 px-2 py-0.5 text-xs font-bold text-white shadow-lg">
                18+
              </span>
            )}
          </div>
          
          {/* Private Lock */}
          {isPrivate && (
            <div className="absolute right-2 top-2 z-10 rounded-full bg-yellow-500 p-1.5 shadow-lg">
              <Lock className="h-3 w-3 text-black" />
            </div>
          )}
          
          {/* Hover Effect */}
          <div className="absolute inset-0 bg-pink-500/0 group-hover:bg-pink-500/20 transition-colors duration-300 z-[5]" />
        </div>

        {/* Footer Stats */}
        <div className="p-3 bg-gray-900">
          {/* Tags */}
          {character.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-2">
              {character.tags.slice(0, 2).map((tag) => (
                <span 
                  key={tag} 
                  className="rounded bg-gray-800 px-2 py-0.5 text-xs text-gray-400 border border-gray-700"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          
          {/* Stats */}
          <div className="flex items-center gap-3 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <Sparkles className="h-3 w-3" />
              {formatNumber(character.chat_count)}
            </span>
            <span className="flex items-center gap-1">
              ❤️ {formatNumber(character.like_count)}
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}
