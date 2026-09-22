// src/app/admin/page.tsx
import { Crown, Users, MessageCircle, TrendingUp, Eye, Sparkles } from 'lucide-react'

// Sample data - in production fetch from Supabase
const STATS = [
  { label: 'Total Users', value: '10,234', change: '+12%', icon: Users, color: 'text-blue-500' },
  { label: 'Active Characters', value: '52', change: '+3', icon: Sparkles, color: 'text-pink-500' },
  { label: 'Messages Today', value: '45,231', change: '+25%', icon: MessageCircle, color: 'text-purple-500' },
  { label: 'Premium Users', value: '1,247', change: '+8%', icon: Crown, color: 'text-yellow-500' },
  { label: 'Page Views', value: '234K', change: '+15%', icon: Eye, color: 'text-green-500' },
  { label: 'Revenue', value: '$12,450', change: '+18%', icon: TrendingUp, color: 'text-emerald-500' },
]

const RECENT_USERS = [
  { id: '1', username: 'cooluser123', email: 'user1@example.com', joined: '2h ago', isPremium: true },
  { id: '2', username: 'anime_lover', email: 'user2@example.com', joined: '5h ago', isPremium: false },
  { id: '3', username: 'soulfriend', email: 'user3@example.com', joined: '1d ago', isPremium: true },
  { id: '4', username: 'chatmaster', email: 'user4@example.com', joined: '2d ago', isPremium: false },
  { id: '5', username: 'nightowl', email: 'user5@example.com', joined: '3d ago', isPremium: true },
]

const TOP_CHARACTERS = [
  { id: '1', name: 'Raven', chats: 15200, likes: 4500 },
  { id: '2', name: 'Sophia', chats: 12500, likes: 3400 },
  { id: '3', name: 'Luna', chats: 8900, likes: 2100 },
  { id: '4', name: 'Kai', chats: 4300, likes: 1200 },
]

export default function AdminDashboard() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-1">Dashboard</h1>
        <p className="text-gray-400">Welcome back! Here&apos;s what&apos;s happening with SoulKiss.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-8">
        {STATS.map((stat) => (
          <div key={stat.label} className="rounded-xl border border-gray-800 bg-gray-900 p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">{stat.label}</span>
              <stat.icon className={cn('h-5 w-5', stat.color)} />
            </div>
            <div className="text-2xl font-bold text-white">{stat.value}</div>
            <div className="text-xs text-green-500 mt-1">{stat.change} from last week</div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Users */}
        <div className="rounded-xl border border-gray-800 bg-gray-900">
          <div className="p-4 border-b border-gray-800">
            <h2 className="text-lg font-semibold text-white">Recent Users</h2>
          </div>
          <div className="p-4">
            <div className="space-y-3">
              {RECENT_USERS.map((user) => (
                <div key={user.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-gray-800 flex items-center justify-center text-sm font-medium text-white">
                      {user.username[0].toUpperCase()}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-white">
                        {user.username}
                        {user.isPremium && (
                          <Crown className="inline h-3 w-3 text-yellow-500 ml-1" />
                        )}
                      </div>
                      <div className="text-xs text-gray-500">{user.email}</div>
                    </div>
                  </div>
                  <span className="text-xs text-gray-500">{user.joined}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Characters */}
        <div className="rounded-xl border border-gray-800 bg-gray-900">
          <div className="p-4 border-b border-gray-800">
            <h2 className="text-lg font-semibold text-white">Top Characters</h2>
          </div>
          <div className="p-4">
            <div className="space-y-3">
              {TOP_CHARACTERS.map((char, i) => (
                <div key={char.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-bold text-gray-600">#{i + 1}</span>
                    <div>
                      <div className="text-sm font-medium text-white">{char.name}</div>
                      <div className="text-xs text-gray-500">
                        {char.chats.toLocaleString()} chats • {char.likes.toLocaleString()} likes
                      </div>
                    </div>
                  </div>
                  <div className="h-8 w-24 rounded bg-gray-800 overflow-hidden">
                    <div
                      className="h-full bg-pink-500"
                      style={{ width: `${(char.chats / 15200) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function cn(...classes: (string | false | undefined | null)[]) {
  return classes.filter(Boolean).join(' ')
}
