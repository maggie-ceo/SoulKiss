// src/lib/utils.ts
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string | Date): string {
  const d = new Date(date)
  const now = new Date()
  const diff = now.getTime() - d.getTime()

  // Less than 1 minute
  if (diff < 60000) return 'Just now'
  // Less than 1 hour
  if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`
  // Less than 24 hours
  if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`
  // Less than 7 days
  if (diff < 604800000) return `${Math.floor(diff / 86400000)}d ago`
  // Otherwise
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: d.getFullYear() !== now.getFullYear() ? 'numeric' : undefined,
  })
}

export function formatNumber(num: number): string {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
  return num.toString()
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str
  return str.slice(0, length) + '...'
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 15)
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

export function validateUsername(username: string): { valid: boolean; error?: string } {
  if (username.length < 3) return { valid: false, error: 'Username must be at least 3 characters' }
  if (username.length > 20) return { valid: false, error: 'Username must be at most 20 characters' }
  if (!/^[a-zA-Z0-9_]+$/.test(username))
    return { valid: false, error: 'Username can only contain letters, numbers, and underscores' }
  return { valid: true }
}

export const CATEGORIES = [
  { id: 'girl', label: 'Girl', icon: '👩' },
  { id: 'guy', label: 'Guy', icon: '👨' },
  { id: 'anime', label: 'Anime', icon: '🎭' },
  { id: 'fantasy', label: 'Fantasy', icon: '🧙' },
  { id: 'mature', label: 'Mature', icon: '🔥' },
  { id: 'original', label: 'Original', icon: '⭐' },
] as const
