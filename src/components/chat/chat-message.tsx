// src/components/chat/chat-message.tsx
'use client'

import { Avatar } from '@/components/ui/avatar'
import { formatDate } from '@/lib/utils'
import { cn } from '@/lib/utils'
import { Play, Pause, Image as ImageIcon } from 'lucide-react'
import { useState } from 'react'

interface ChatMessageProps {
  content: string
  role: 'user' | 'assistant'
  timestamp: string
  avatarUrl?: string | null
  characterName?: string
  hasImage?: boolean
  imageUrl?: string
  hasVoice?: boolean
  voiceUrl?: string
}

// Comprehensive action-to-emoji mapping
function convertActionsToEmojis(text: string): string {
  const actionMap: Record<string, string> = {
    // Bengali হাসি/হাসিমুখ
    'হেসে ওঠে': '😊',
    'হাসে': '😊',
    'হাসি': '😊',
    'মুখ হাসি': '😊',
    'হাসি লাগিয়ে': '😊',
    'হাসিমুখে': '😊',
    'মুচকি হাসি': '😄',
    'বেশ হাসে': '😂',
    
    // Bengali অনুভূতি
    'দুঃখিত': '😢',
    'দুঃখ': '😢',
    'কষ্ট': '😢',
    'রাগ': '😠',
    'চমকায়': '😲',
    'ভাবে': '🤔',
    'চিন্তা': '🤔',
    'ভয়': '😨',
    'লাজ': '😳',
    'সম্মান': '🙏',
    'ভালোবাসা': '❤️',
    'ভালোবাসি': '❤️',
    'মন': '❤️',
    'আনন্দ': '🎉',
    'খুশি': '😊',
    
    // Smiling
    'smiles warmly': '😊',
    'smiles': '😊',
    'grins': '😁',
    'beams': '😁',
    
    // Laughing
    'laughs': '😂',
    'giggles': '😄',
    'chuckles': '😄',
    'snickers': '😏',
    
    // Affection
    'hugs': '🤗',
    'kisses': '😘',
    'cuddles': '🥰',
    'nuzzles': '🥰',
    'snuggles': '🥰',
    'embraces': '🤗',
    
    // Shy/Embarrassed
    'blushes': '😳',
    'shy': '😳',
    'looks away shyly': '😳',
    'averts eyes': '😳',
    'flushes': '😳',
    
    // Sad
    'cries': '😢',
    'sobs': '😭',
    'tears up': '😢',
    'frowns': '😞',
    'pouts': '😔',
    
    // Angry
    'angry': '😠',
    'fumes': '😤',
    'scowls': '😠',
    'glares': '😠',
    
    // Surprised
    'surprised': '😲',
    'gasps': '😱',
    'shocked': '😲',
    'wide-eyed': '😳',
    
    // Thinking
    'thinks': '🤔',
    'ponders': '🤔',
    'contemplates': '🤔',
    'considers': '🤔',
    
    // Waving
    'waves': '👋',
    'waves back': '👋',
    'greets': '👋',
    
    // Nodding
    'nods': '👍',
    'agrees': '👍',
    
    // Winking
    'winks': '😉',
    'wink': '😉',
    
    // Excited
    'excited': '🤩',
    'enthusiastic': '🤩',
    'cheers': '🎉',
    'celebrates': '🎉',
    
    // Cool/Smug
    'smirks': '😏',
    'grins mischievously': '😈',
    'smug': '😏',
    
    // Sleepy
    'yawns': '🥱',
    'sleeps': '😴',
    'dozes': '😴',
    
    // Drinking/Eating
    'drinks coffee': '☕',
    'sips coffee': '☕',
    'drinks tea': '🍵',
    'eats': '🍽️',
    'cooks': '🍳',
    
    // Music/Arts
    'sings': '🎤',
    'hums': '🎵',
    'dances': '💃',
    'dances happily': '💃',
    'paints': '🎨',
    'draws': '✏️',
    'reads': '📚',
    'reads a book': '📚',
    'writes': '✍️',
    
    // Nature
    'enjoys nature': '🌿',
    'watches sunset': '🌅',
    'stargazes': '🌟',
    'gardens': '🌸',
    
    // Animals
    'plays with cat': '🐱',
    'plays with dog': '🐶',
    
    // Celebrations
    'party': '🎉',
    'birthday': '🎂',
    
    // Hearts
    'love': '❤️',
    'heart': '❤️',
    'loves': '❤️',
    'adores': '❤️',
    'cherishes': '💝',
    
    // Sparkles
    'sparkle': '✨',
    'magical': '✨',
    'glitter': '✨',
    
    // Fire
    'fire': '🔥',
    'hot': '🔥',
    'passion': '🔥',
  }

  let result = text
  for (const [action, emoji] of Object.entries(actionMap)) {
    const regex = new RegExp(`\\*${action}\\*`, 'gi')
    result = result.replace(regex, emoji)
  }
  return result
}

// Add emoji to message if it doesn't end with one
function ensureEmojiAtEnd(text: string, role: 'user' | 'assistant'): string {
  if (role === 'user') return text // Don't add emojis to user messages
  
  const commonEmojis = ['😊', '😂', '❤️', '🔥', '✨', '👍', '🥰', '🤔', '😄', '💕', '🌟', '💋', '🦋', '🌸', '🌙', '☀️', '🎵', '📚', '🎨', '☕', '🍕', '🐱', '🐶', '🎉', '💪', '🙏', '😘', '😉', '🤗', '😎']
  
  // Check if text already ends with an emoji
  const lastChar = text.trim().slice(-2)
  const hasEndEmoji = commonEmojis.some(emoji => text.trim().endsWith(emoji))
  
  if (!hasEndEmoji && text.trim().length > 0) {
    // Add a random appropriate emoji based on content
    let selectedEmoji = '😊'
    
    if (text.includes('love') || text.includes('ভালোবাসা') || text.includes('❤️')) {
      selectedEmoji = '❤️'
    } else if (text.includes('happy') || text.includes('খুশি') || text.includes('ভালো')) {
      selectedEmoji = '😊'
    } else if (text.includes('sad') || text.includes('দুঃখ') || text.includes('কষ্ট')) {
      selectedEmoji = '😢'
    } else if (text.includes('angry') || text.includes('রাগ') || text.includes('ঘৃণা')) {
      selectedEmoji = '😤'
    } else if (text.includes('surprise') || text.includes('অবাক') || text.includes('তাজ্জব')) {
      selectedEmoji = '😲'
    } else if (text.includes('think') || text.includes('ভাবা') || text.includes('চিন্তা')) {
      selectedEmoji = '🤔'
    } else if (text.includes('laugh') || text.includes('হাসি') || text.includes('মজা')) {
      selectedEmoji = '😂'
    } else if (text.includes('excited') || text.includes('উত্তেজনা') || text.includes('আনন্দ')) {
      selectedEmoji = '🤩'
    } else if (text.includes('shy') || text.includes('লাজুক') || text.includes('বিনয়ী')) {
      selectedEmoji = '😳'
    } else if (text.includes('cool') || text.includes('দারুণ') || text.includes('চমৎকার')) {
      selectedEmoji = '😎'
    } else if (text.includes('fire') || text.includes('আগুন') || text.includes('জ্বলন্ত')) {
      selectedEmoji = '🔥'
    } else if (text.includes('magic') || text.includes('জাদু') || text.includes('কৌতুহল')) {
      selectedEmoji = '✨'
    } else if (text.includes('kiss') || text.includes('চুম্বন') || text.includes('মুখাপেক্ষী')) {
      selectedEmoji = '😘'
    } else if (text.includes('hug') || text.includes('আলিঙ্গন') || text.includes('কোলাকোলি')) {
      selectedEmoji = '🤗'
    } else if (text.includes('শান্ত') || text.includes('প্রশান্ত')) {
      selectedEmoji = '😌'
    } else if (text.includes('কৌতুহল') || text.includes('জিজ্ঞাসা')) {
      selectedEmoji = '🤔'
    } else if (text.includes('অভিনন্দন') || text.includes('ভালো')) {
      selectedEmoji = '🎉'
    } else if (text.includes('সময়') || text.includes('অপেক্ষা')) {
      selectedEmoji = '⏰'
    } else if (text.includes('গান') || text.includes('সংগীত')) {
      selectedEmoji = '🎵'
    } else if (text.includes('বই') || text.includes('পড়া')) {
      selectedEmoji = '📚'
    } else if (text.includes('খাওয়া') || text.includes('খাবার')) {
      selectedEmoji = '🍕'
    } else if (text.includes('ঘুম') || text.includes('ক্লান্ত')) {
      selectedEmoji = '😴'
    } else if (text.includes('ভ্রমণ') || text.includes('যাত্রা')) {
      selectedEmoji = '✈️'
    } else if (text.includes('প্রকৃতি') || text.includes('ফুল')) {
      selectedEmoji = '🌸'
    } else if (text.includes('বৃষ্টি') || text.includes('মেঘ')) {
      selectedEmoji = '🌧️'
    } else if (text.includes('রোদ') || text.includes('গরম')) {
      selectedEmoji = '☀️'
    } else if (text.includes('চাঁদ') || text.includes('রাত')) {
      selectedEmoji = '🌙'
    } else if (text.includes('তারা') || text.includes('আকাশ')) {
      selectedEmoji = '⭐'
    } else {
      selectedEmoji = commonEmojis[Math.floor(Math.random() * commonEmojis.length)]
    }
    
    return text.trim() + ' ' + selectedEmoji
  }
  
  return text
}

export function ChatMessage({
  content,
  role,
  timestamp,
  avatarUrl,
  characterName,
  hasImage,
  imageUrl,
  hasVoice,
  voiceUrl,
}: ChatMessageProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const isUser = role === 'user'
  const displayContent = ensureEmojiAtEnd(convertActionsToEmojis(content), role)

  const handlePlayVoice = () => {
    if (voiceUrl) {
      const audio = new Audio(voiceUrl)
      audio.play()
      setIsPlaying(true)
      audio.onended = () => setIsPlaying(false)
    }
  }

  return (
    <div className={cn('flex gap-3 mb-4', isUser ? 'flex-row-reverse' : 'flex-row')}>
      {/* Avatar */}
      <div className="flex-shrink-0">
        <Avatar
          src={isUser ? undefined : avatarUrl}
          alt={isUser ? 'You' : characterName}
          fallback={isUser ? 'U' : characterName?.[0] || 'C'}
          size="md"
        />
      </div>

      {/* Message bubble */}
      <div className={cn('max-w-[70%]', isUser ? 'items-end' : 'items-start')}>
        <div
          className={cn(
            'rounded-2xl px-4 py-3',
            isUser
              ? 'bg-pink-600 text-white rounded-br-md'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-bl-md'
          )}
        >
          <p className="text-sm whitespace-pre-wrap">{displayContent}</p>
        </div>

        {/* Image */}
        {hasImage && imageUrl && (
          <div className="mt-2 rounded-lg overflow-hidden max-w-xs">
            <img src={imageUrl} alt="Generated" className="w-full h-auto" />
          </div>
        )}

        {/* Voice message */}
        {hasVoice && voiceUrl && (
          <button
            onClick={handlePlayVoice}
            className="mt-2 flex items-center gap-2 rounded-full bg-gray-100 dark:bg-gray-800 px-3 py-1.5 text-xs hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            {isPlaying ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
            {isPlaying ? 'Playing...' : 'Play voice'}
          </button>
        )}

        {/* Timestamp */}
        <p className={cn('mt-1 text-xs text-gray-400', isUser ? 'text-right' : 'text-left')}>
          {formatDate(timestamp)}
        </p>
      </div>
    </div>
  )
}
