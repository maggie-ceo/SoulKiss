'use client'

import { useState, useEffect, useRef } from 'react'
import { useParams } from 'next/navigation'
import { ChatMessage } from '@/components/chat/chat-message'
import { ChatInput } from '@/components/chat/chat-input'
import { Avatar } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Heart, MoreVertical, Sparkles, Image } from 'lucide-react'
import Link from 'next/link'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  created_at: string
  has_image?: boolean
  image_url?: string
}

const SAMPLE_CHARACTER = {
  id: '1',
  name: 'Sophia',
  tagline: 'Your caring college roommate',
  avatar_url: null,
  personality: 'Sophia is a caring and supportive college student studying art. She has a secret crush on you but tries to hide it. She loves painting, indie music, and late-night conversations.',
}

export default function ChatPageClient() {
  const params = useParams()
  const characterId = params.characterId as string
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isGeneratingImage, setIsGeneratingImage] = useState(false)
  const [character] = useState(SAMPLE_CHARACTER)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleGenerateImage = async () => {
    setIsGeneratingImage(true)
    try {
      const response = await fetch('/api/chat/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          characterId,
          generateImage: true,
          history: messages.map((m) => ({ role: m.role, content: m.content })),
        }),
      })
      const data = await response.json()
      if (data.success) {
        if (data.imageUrl) {
          const imageMessage: Message = {
            id: Date.now().toString(),
            role: 'assistant',
            content: 'Here\'s your image! 🎨',
            created_at: new Date().toISOString(),
            has_image: true,
            image_url: data.imageUrl,
          }
          setMessages((prev) => [...prev, imageMessage])
        } else if (data.message) {
          const textMessage: Message = {
            id: Date.now().toString(),
            role: 'assistant',
            content: data.message,
            created_at: new Date().toISOString(),
          }
          setMessages((prev) => [...prev, textMessage])
        }
      }
    } catch (error) {
      console.error('Failed to generate image:', error)
    } finally {
      setIsGeneratingImage(false)
    }
  }

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      created_at: new Date().toISOString(),
    }

    setMessages((prev) => [...prev, userMessage])
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          characterId,
          message: content,
          history: messages.map((m) => ({ role: m.role, content: m.content })),
        }),
      })

      const data = await response.json()

      if (data.success) {
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: data.message,
          created_at: new Date().toISOString(),
        }
        setMessages((prev) => [...prev, assistantMessage])
      }
    } catch (error) {
      console.error('Failed to send message:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex h-[calc(100vh-8rem)] flex-col">
      <div className="flex items-center justify-between border-b border-gray-800 bg-gray-900 px-4 py-3">
        <div className="flex items-center gap-3">
          <Link href="/discover">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <Avatar
            src={character.avatar_url}
            alt={character.name}
            fallback={character.name[0]}
            size="md"
          />
          <div>
            <h2 className="font-semibold text-white">{character.name}</h2>
            <p className="text-xs text-gray-400">Online</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Heart className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <MoreVertical className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center text-center">
            <Sparkles className="h-12 w-12 text-pink-500 mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">
              Start chatting with {character.name}
            </h3>
            <p className="text-sm text-gray-400 max-w-md">
              {character.tagline}. Say hello to begin your conversation!
            </p>
          </div>
        ) : (
          messages.map((message) => (
            <ChatMessage
              key={message.id}
              content={message.content}
              role={message.role}
              timestamp={message.created_at}
              avatarUrl={character.avatar_url || undefined}
              characterName={character.name}
              hasImage={message.has_image}
              imageUrl={message.image_url}
            />
          ))
        )}
        {isGeneratingImage && (
          <div className="flex gap-3">
            <Avatar
              src={character.avatar_url}
              alt={character.name}
              fallback={character.name[0]}
              size="md"
            />
            <div className="rounded-2xl rounded-bl-md bg-gray-800 px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-400">Generating image</span>
                <span className="h-2 w-2 rounded-full bg-pink-500 animate-bounce" />
                <span className="h-2 w-2 rounded-full bg-pink-500 animate-bounce [animation-delay:0.2s]" />
                <span className="h-2 w-2 rounded-full bg-pink-500 animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>
          </div>
        )}
        {isLoading && (
          <div className="flex gap-3">
            <Avatar
              src={character.avatar_url}
              alt={character.name}
              fallback={character.name[0]}
              size="md"
            />
            <div className="rounded-2xl rounded-bl-md bg-gray-800 px-4 py-3">
              <div className="flex gap-1">
                <span className="h-2 w-2 rounded-full bg-gray-500 animate-bounce" />
                <span className="h-2 w-2 rounded-full bg-gray-500 animate-bounce [animation-delay:0.2s]" />
                <span className="h-2 w-2 rounded-full bg-gray-500 animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <ChatInput
        onSend={handleSendMessage}
        onGenerateImage={handleGenerateImage}
        disabled={isLoading || isGeneratingImage}
        placeholder={`Message ${character.name}...`}
      />
    </div>
  )
}
