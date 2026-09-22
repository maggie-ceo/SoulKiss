// src/app/(main)/create/page.tsx
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar } from '@/components/ui/avatar'
import { Sparkles, Upload, X, Plus } from 'lucide-react'
import { CATEGORIES } from '@/lib/utils'

const PERSONALITY_PRESETS = [
  { id: 'caring', label: 'Caring', emoji: '💕' },
  { id: 'flirty', label: 'Flirty', emoji: '😏' },
  { id: 'dominant', label: 'Dominant', emoji: '👑' },
  { id: 'shy', label: 'Shy', emoji: '😳' },
  { id: 'energetic', label: 'Energetic', emoji: '⚡' },
  { id: 'mysterious', label: 'Mysterious', emoji: '🌙' },
  { id: 'tsundere', label: 'Tsundere', emoji: '😤' },
  { id: 'supportive', label: 'Supportive', emoji: '🤗' },
  { id: 'funny', label: 'Funny', emoji: '😂' },
  { id: 'intellectual', label: 'Intellectual', emoji: '📚' },
]

export default function CreateCharacterPage() {
  const [name, setName] = useState('')
  const [tagline, setTagline] = useState('')
  const [description, setDescription] = useState('')
  const [personality, setPersonality] = useState('')
  const [selectedPersonalities, setSelectedPersonalities] = useState<string[]>([])
  const [selectedCategory, setSelectedCategory] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const [tagInput, setTagInput] = useState('')
  const [isNsfw, setIsNsfw] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const togglePersonality = (id: string) => {
    setSelectedPersonalities((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    )
  }

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()])
      setTagInput('')
    }
  }

  const removeTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // TODO: API call to create character
    setTimeout(() => setIsSubmitting(false), 1500)
  }

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Create Character</h1>
        <p className="text-gray-400">
          Design your own AI companion with unique personality and appearance
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Form */}
        <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-6">
          {/* Basic Info */}
          <Card className="border-gray-800 bg-gray-900">
            <CardHeader>
              <CardTitle className="text-white">Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Name *</label>
                <Input
                  placeholder="e.g., Sophia, Luna, Kai"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-gray-800 border-gray-700"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Tagline</label>
                <Input
                  placeholder="A short catchy description"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  className="bg-gray-800 border-gray-700"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Description</label>
                <Textarea
                  placeholder="Detailed backstory, appearance, and personality..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="bg-gray-800 border-gray-700 min-h-[120px]"
                />
              </div>
            </CardContent>
          </Card>

          {/* Personality */}
          <Card className="border-gray-800 bg-gray-900">
            <CardHeader>
              <CardTitle className="text-white">Personality</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {PERSONALITY_PRESETS.map((preset) => (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => togglePersonality(preset.id)}
                    className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                      selectedPersonalities.includes(preset.id)
                        ? 'bg-pink-600 text-white'
                        : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                    }`}
                  >
                    {preset.emoji} {preset.label}
                  </button>
                ))}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Custom Personality</label>
                <Textarea
                  placeholder="Describe how this character speaks, behaves, and interacts..."
                  value={personality}
                  onChange={(e) => setPersonality(e.target.value)}
                  className="bg-gray-800 border-gray-700 min-h-[100px]"
                />
              </div>
            </CardContent>
          </Card>

          {/* Category & Tags */}
          <Card className="border-gray-800 bg-gray-900">
            <CardHeader>
              <CardTitle className="text-white">Category & Tags</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
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
              <div className="flex gap-2">
                <Input
                  placeholder="Add a tag..."
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                  className="bg-gray-800 border-gray-700"
                />
                <Button type="button" variant="outline" onClick={addTag}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="gap-1">
                      {tag}
                      <button type="button" onClick={() => removeTag(tag)}>
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* NSFW Toggle */}
          <Card className="border-gray-800 bg-gray-900">
            <CardContent className="py-4">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isNsfw}
                  onChange={(e) => setIsNsfw(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-700 bg-gray-800 text-pink-600"
                />
                <span className="text-sm font-medium text-gray-300">
                  Mark as 18+ / NSFW content
                </span>
              </label>
            </CardContent>
          </Card>

          <Button type="submit" className="w-full" isLoading={isSubmitting}>
            <Sparkles className="mr-2 h-4 w-4" />
            Create Character
          </Button>
        </form>

        {/* Preview */}
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <h3 className="mb-4 text-sm font-medium text-gray-400">Preview</h3>
            <Card className="border-gray-800 bg-gray-900 overflow-hidden">
              <div className="relative h-48 bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center">
                <Avatar fallback={name?.[0] || '?'} size="xl" />
                {isNsfw && (
                  <Badge variant="destructive" className="absolute right-2 top-2">
                    18+
                  </Badge>
                )}
              </div>
              <CardContent className="p-4">
                <h4 className="font-semibold text-white">{name || 'Character Name'}</h4>
                <p className="text-sm text-gray-400 mt-1">
                  {tagline || 'Your tagline here'}
                </p>
                {selectedCategory && (
                  <Badge variant="secondary" className="mt-2">
                    {CATEGORIES.find((c) => c.id === selectedCategory)?.label}
                  </Badge>
                )}
                {selectedPersonalities.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-3">
                    {selectedPersonalities.map((p) => (
                      <Badge key={p} variant="outline" className="text-xs">
                        {PERSONALITY_PRESETS.find((pr) => pr.id === p)?.label}
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
