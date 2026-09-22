// src/lib/store.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Character {
  id: string
  name: string
  tagline?: string
  description?: string
  personality?: string
  system_prompt?: string
  avatar_url?: string
  category: string
  tags: string[]
  is_nsfw: boolean
  creator_id?: string
  chat_count: number
  like_count: number
  created_at: string
}

export interface ChatMessage {
  id: string
  session_id: string
  user_id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  has_image: boolean
  image_url?: string
  has_voice: boolean
  voice_url?: string
  created_at: string
}

export interface ChatSession {
  id: string
  character_id: string
  character?: Character
  title?: string
  last_message_at: string
  message_count: number
}

export interface UserProfile {
  id: string
  username: string
  display_name?: string
  avatar_url?: string
  is_premium: boolean
  gems: number
  message_count: number
}

interface AppState {
  // User
  user: UserProfile | null
  setUser: (user: UserProfile | null) => void
  isAuthenticated: boolean
  setIsAuthenticated: (auth: boolean) => void

  // Theme
  theme: 'light' | 'dark' | 'system'
  setTheme: (theme: 'light' | 'dark' | 'system') => void

  // Sidebar
  sidebarOpen: boolean
  toggleSidebar: () => void
  setSidebarOpen: (open: boolean) => void

  // Chat
  currentSession: ChatSession | null
  setCurrentSession: (session: ChatSession | null) => void

  // Notifications
  notifications: { id: string; message: string; type: 'success' | 'error' | 'info' }[]
  addNotification: (message: string, type: 'success' | 'error' | 'info') => void
  removeNotification: (id: string) => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      // User
      user: null,
      setUser: (user) => set({ user }),
      isAuthenticated: false,
      setIsAuthenticated: (auth) => set({ isAuthenticated: auth }),

      // Theme
      theme: 'dark',
      setTheme: (theme) => set({ theme }),

      // Sidebar
      sidebarOpen: false,
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      setSidebarOpen: (open) => set({ sidebarOpen: open }),

      // Chat
      currentSession: null,
      setCurrentSession: (session) => set({ currentSession: session }),

      // Notifications
      notifications: [],
      addNotification: (message, type) =>
        set((state) => ({
          notifications: [
            ...state.notifications,
            { id: Date.now().toString(), message, type },
          ],
        })),
      removeNotification: (id) =>
        set((state) => ({
          notifications: state.notifications.filter((n) => n.id !== id),
        })),
    }),
    {
      name: 'soulkiss-storage',
      partialize: (state) => ({
        theme: state.theme,
        sidebarOpen: state.sidebarOpen,
      }),
    }
  )
)
