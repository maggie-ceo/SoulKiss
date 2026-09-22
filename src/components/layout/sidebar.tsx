// src/components/layout/sidebar.tsx
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Sparkles, Play, MessageCircle, Grid3X3, Plus, User, Heart, Crown, Lock, Settings, HelpCircle, Mail, Users, Globe, Shield, FileText } from 'lucide-react'
import { cn } from '@/lib/utils'

const mainNav = [
  { href: '/', icon: Home, label: 'Home' },
  { href: '/discover', icon: Sparkles, label: 'Discover' },
  { href: '/shorts', icon: Play, label: 'Shorts' },
  { href: '/chat', icon: MessageCircle, label: 'Chat' },
  { href: '/collection', icon: Grid3X3, label: 'Collection' },
  { href: '/create', icon: Plus, label: 'Create Character' },
  { href: '/my-ai', icon: User, label: 'My AI' },
  { href: '/private', icon: Lock, label: 'Private Content' },
]

const bottomNav = [
  { href: '/premium', icon: Crown, label: 'Premium', badge: '-70%' },
]

const socialLinks = [
  { href: '#', icon: Globe, label: 'English' },
  { href: '#', icon: Users, label: 'Discord' },
  { href: '#', icon: HelpCircle, label: 'Help Center' },
  { href: '#', icon: Mail, label: 'Contact Us' },
  { href: '#', icon: Users, label: 'Affiliate' },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-0 z-40 h-full w-64 border-r border-gray-800 bg-gray-950 overflow-y-auto scrollbar-hidden">
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center gap-2 border-b border-gray-800 px-4">
          <Sparkles className="h-6 w-6 text-pink-500" />
          <span className="text-xl font-bold text-white">SoulKiss</span>
        </div>

        {/* Main Navigation */}
        <nav className="flex-1 p-3 space-y-1">
          {mainNav.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-pink-500/10 text-pink-500'
                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </Link>
            )
          })}
          
          {/* Premium with badge */}
          {bottomNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-gray-400 hover:bg-gray-800 hover:text-white transition-colors"
            >
              <div className="flex items-center gap-3">
                <item.icon className="h-5 w-5" />
                {item.label}
              </div>
              {item.badge && (
                <span className="rounded bg-red-600 px-1.5 py-0.5 text-xs font-bold text-white">
                  {item.badge}
                </span>
              )}
            </Link>
          ))}
        </nav>

        {/* Social Links */}
        <div className="border-t border-gray-800 p-3 space-y-1">
          {socialLinks.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-500 hover:bg-gray-800 hover:text-white transition-colors"
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </div>

        {/* Legal */}
        <div className="border-t border-gray-800 p-3">
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <FileText className="h-3 w-3" />
            <span>Legal Terms</span>
            <span>|</span>
            <Shield className="h-3 w-3" />
            <span>Trust & Safety</span>
          </div>
        </div>
      </div>
    </aside>
  )
}
