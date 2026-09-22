// src/components/layout/header.tsx
'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Search, Bell } from 'lucide-react'
import { useAppStore } from '@/lib/store'

export function Header() {
  const { user } = useAppStore()

  return (
    <header className="sticky top-0 z-30 border-b border-gray-800 bg-gray-950/95 backdrop-blur-md">
      <div className="flex h-16 items-center gap-4 px-4 lg:px-6">
        {/* Search bar */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search characters..."
              className="h-10 w-full rounded-lg border border-gray-800 bg-gray-900 pl-10 pr-4 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <button className="relative p-2 text-gray-400 hover:text-white transition-colors">
            <Bell className="h-5 w-5" />
            <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-pink-500" />
          </button>

          {user ? (
            <Link href="/profile">
              <div className="h-9 w-9 rounded-full bg-gray-800 flex items-center justify-center text-sm font-medium text-white">
                {user.display_name?.[0] || 'U'}
              </div>
            </Link>
          ) : (
            <div className="flex gap-2">
              <Link href="/login">
                <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white">
                  Login
                </Button>
              </Link>
              <Link href="/register">
                <Button size="sm" className="bg-pink-600 hover:bg-pink-700 text-white">
                  Create Free Account
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
