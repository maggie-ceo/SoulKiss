// src/types/database.ts
export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          username: string
          display_name: string | null
          avatar_url: string | null
          bio: string | null
          is_premium: boolean
          premium_expires_at: string | null
          gems: number
          message_count: number
          is_banned: boolean
          role: 'user' | 'mod' | 'admin'
          last_seen_at: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          username: string
          display_name?: string | null
          avatar_url?: string | null
          bio?: string | null
          is_premium?: boolean
          premium_expires_at?: string | null
          gems?: number
          message_count?: number
          is_banned?: boolean
          role?: 'user' | 'mod' | 'admin'
          last_seen_at?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          username?: string
          display_name?: string | null
          avatar_url?: string | null
          bio?: string | null
          is_premium?: boolean
          premium_expires_at?: string | null
          gems?: number
          message_count?: number
          is_banned?: boolean
          role?: 'user' | 'mod' | 'admin'
          last_seen_at?: string
          created_at?: string
          updated_at?: string
        }
      }
      characters: {
        Row: {
          id: string
          creator_id: string | null
          name: string
          tagline: string | null
          description: string | null
          personality: string | null
          system_prompt: string | null
          avatar_url: string | null
          banner_url: string | null
          category: string
          tags: string[]
          is_public: boolean
          is_nsfw: boolean
          is_featured: boolean
          chat_count: number
          like_count: number
          message_count: number
          rating: number
          rating_count: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          creator_id?: string | null
          name: string
          tagline?: string | null
          description?: string | null
          personality?: string | null
          system_prompt?: string | null
          avatar_url?: string | null
          banner_url?: string | null
          category?: string
          tags?: string[]
          is_public?: boolean
          is_nsfw?: boolean
          is_featured?: boolean
          chat_count?: number
          like_count?: number
          message_count?: number
          rating?: number
          rating_count?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          creator_id?: string | null
          name?: string
          tagline?: string | null
          description?: string | null
          personality?: string | null
          system_prompt?: string | null
          avatar_url?: string | null
          banner_url?: string | null
          category?: string
          tags?: string[]
          is_public?: boolean
          is_nsfw?: boolean
          is_featured?: boolean
          chat_count?: number
          like_count?: number
          message_count?: number
          rating?: number
          rating_count?: number
          created_at?: string
          updated_at?: string
        }
      }
      chat_sessions: {
        Row: {
          id: string
          user_id: string
          character_id: string
          title: string | null
          last_message_at: string
          message_count: number
          is_archived: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          character_id: string
          title?: string | null
          last_message_at?: string
          message_count?: number
          is_archived?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          character_id?: string
          title?: string | null
          last_message_at?: string
          message_count?: number
          is_archived?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      messages: {
        Row: {
          id: string
          session_id: string
          user_id: string
          role: 'user' | 'assistant' | 'system'
          content: string
          tokens_used: number
          has_image: boolean
          image_url: string | null
          image_prompt: string | null
          has_voice: boolean
          voice_url: string | null
          is_deleted: boolean
          created_at: string
        }
        Insert: {
          id?: string
          session_id: string
          user_id: string
          role: 'user' | 'assistant' | 'system'
          content: string
          tokens_used?: number
          has_image?: boolean
          image_url?: string | null
          image_prompt?: string | null
          has_voice?: boolean
          voice_url?: string | null
          is_deleted?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          session_id?: string
          user_id?: string
          role?: 'user' | 'assistant' | 'system'
          content?: string
          tokens_used?: number
          has_image?: boolean
          image_url?: string | null
          image_prompt?: string | null
          has_voice?: boolean
          voice_url?: string | null
          is_deleted?: boolean
          created_at?: string
        }
      }
      user_favorites: {
        Row: {
          user_id: string
          character_id: string
          created_at: string
        }
        Insert: {
          user_id: string
          character_id: string
          created_at?: string
        }
        Update: {
          user_id?: string
          character_id?: string
          created_at?: string
        }
      }
      character_likes: {
        Row: {
          user_id: string
          character_id: string
          created_at: string
        }
        Insert: {
          user_id: string
          character_id: string
          created_at?: string
        }
        Update: {
          user_id?: string
          character_id?: string
          created_at?: string
        }
      }
      subscriptions: {
        Row: {
          id: string
          user_id: string
          plan: 'free' | 'premium' | 'vip'
          status: 'active' | 'cancelled' | 'expired' | 'trialing'
          provider: string
          provider_subscription_id: string | null
          current_period_start: string | null
          current_period_end: string | null
          cancel_at_period_end: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          plan: 'free' | 'premium' | 'vip'
          status?: 'active' | 'cancelled' | 'expired' | 'trialing'
          provider?: string
          provider_subscription_id?: string | null
          current_period_start?: string | null
          current_period_end?: string | null
          cancel_at_period_end?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          plan?: 'free' | 'premium' | 'vip'
          status?: 'active' | 'cancelled' | 'expired' | 'trialing'
          provider?: string
          provider_subscription_id?: string | null
          current_period_start?: string | null
          current_period_end?: string | null
          cancel_at_period_end?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      transactions: {
        Row: {
          id: string
          user_id: string
          type: 'purchase' | 'spend' | 'earn' | 'refund'
          amount: number
          gems_balance_after: number | null
          description: string | null
          reference_type: string | null
          reference_id: string | null
          provider: string | null
          provider_transaction_id: string | null
          status: 'pending' | 'completed' | 'failed' | 'refunded'
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          type: 'purchase' | 'spend' | 'earn' | 'refund'
          amount: number
          gems_balance_after?: number | null
          description?: string | null
          reference_type?: string | null
          reference_id?: string | null
          provider?: string | null
          provider_transaction_id?: string | null
          status?: 'pending' | 'completed' | 'failed' | 'refunded'
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          type?: 'purchase' | 'spend' | 'earn' | 'refund'
          amount?: number
          gems_balance_after?: number | null
          description?: string | null
          reference_type?: string | null
          reference_id?: string | null
          provider?: string | null
          provider_transaction_id?: string | null
          status?: 'pending' | 'completed' | 'failed' | 'refunded'
          created_at?: string
        }
      }
    }
  }
}
