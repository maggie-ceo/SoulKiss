// src/components/chat/chat-input.tsx
'use client'

import { useState, KeyboardEvent, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Send, Image, Mic } from 'lucide-react'

interface ChatInputProps {
  onSend: (message: string) => void
  onGenerateImage?: () => void
  disabled?: boolean
  placeholder?: string
}

export function ChatInput({
  onSend,
  onGenerateImage,
  disabled,
  placeholder = 'Type your message...',
}: ChatInputProps) {
  const [message, setMessage] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleSend = () => {
    // Read from state first, fallback to DOM value
    const msg = message.trim() || textareaRef.current?.value?.trim() || ''
    if (msg && !disabled) {
      onSend(msg)
      setMessage('')
      if (textareaRef.current) {
        textareaRef.current.value = ''
      }
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 p-4">
      <div className="flex items-end gap-2">
        {onGenerateImage && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onGenerateImage}
            disabled={disabled}
            title="Generate image"
          >
            <Image className="h-5 w-5" />
          </Button>
        )}
        <Textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          className="min-h-[44px] max-h-[120px]"
          rows={1}
        />
        <Button
          onClick={handleSend}
          disabled={disabled}
          size="icon"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
