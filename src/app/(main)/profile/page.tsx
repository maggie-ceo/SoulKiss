// src/app/(main)/profile/page.tsx
'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { useAppStore } from '@/lib/store'
import { getInitials } from '@/lib/utils'
import { User, Mail, Calendar, MessageCircle, Heart, Sparkles, Crown } from 'lucide-react'

export default function ProfilePage() {
  const { user } = useAppStore()
  const [isEditing, setIsEditing] = useState(false)

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Profile</h1>
        <p className="text-gray-400">Manage your account and preferences</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Profile Card */}
        <Card className="border-gray-800 bg-gray-900">
          <CardContent className="p-6 text-center">
            <Avatar
              src={user?.avatar_url}
              alt={user?.display_name || 'User'}
              fallback={getInitials(user?.display_name || 'U')}
              size="xl"
            />
            <h2 className="mt-4 text-xl font-semibold text-white">
              {user?.display_name || 'Guest User'}
            </h2>
            <p className="text-sm text-gray-400">@{user?.username || 'guest'}</p>
            
            {user?.is_premium ? (
              <Badge variant="premium" className="mt-3">
                <Crown className="mr-1 h-3 w-3" />
                Premium
              </Badge>
            ) : (
              <Badge variant="secondary" className="mt-3">Free Plan</Badge>
            )}

            <div className="mt-6 grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-lg font-bold text-white">{user?.message_count || 0}</div>
                <div className="text-xs text-gray-500">Messages</div>
              </div>
              <div>
                <div className="text-lg font-bold text-white">{user?.gems || 0}</div>
                <div className="text-xs text-gray-500">Gems</div>
              </div>
              <div>
                <div className="text-lg font-bold text-white">0</div>
                <div className="text-xs text-gray-500">Characters</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Details */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-gray-800 bg-gray-900">
            <CardHeader>
              <CardTitle className="text-white">Account Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <User className="h-5 w-5 text-gray-500" />
                <div>
                  <div className="text-sm text-gray-500">Username</div>
                  <div className="text-white">@{user?.username || 'guest'}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-gray-500" />
                <div>
                  <div className="text-sm text-gray-500">Email</div>
                  <div className="text-white">Not set</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-gray-500" />
                <div>
                  <div className="text-sm text-gray-500">Member Since</div>
                  <div className="text-white">Today</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-800 bg-gray-900">
            <CardHeader>
              <CardTitle className="text-white">Subscription</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-white font-medium">Free Plan</div>
                  <div className="text-sm text-gray-500">50 messages/day, 5 characters</div>
                </div>
                <Button size="sm">
                  <Crown className="mr-1 h-3 w-3" />
                  Upgrade
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
