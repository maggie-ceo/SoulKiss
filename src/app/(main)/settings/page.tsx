// src/app/(main)/settings/page.tsx
'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useAppStore } from '@/lib/store'
import { Moon, Sun, Monitor, Bell, Shield, Trash2 } from 'lucide-react'

export default function SettingsPage() {
  const { theme, setTheme } = useAppStore()

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
        <p className="text-gray-400">Customize your SoulKiss experience</p>
      </div>

      <div className="space-y-6">
        {/* Appearance */}
        <Card className="border-gray-800 bg-gray-900">
          <CardHeader>
            <CardTitle className="text-white">Appearance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-3">
              <button
                onClick={() => setTheme('light')}
                className={`flex flex-col items-center gap-2 rounded-lg border-2 p-4 transition-colors ${
                  theme === 'light' ? 'border-pink-500' : 'border-gray-700 hover:border-gray-600'
                }`}
              >
                <Sun className="h-6 w-6 text-yellow-500" />
                <span className="text-sm text-gray-300">Light</span>
              </button>
              <button
                onClick={() => setTheme('dark')}
                className={`flex flex-col items-center gap-2 rounded-lg border-2 p-4 transition-colors ${
                  theme === 'dark' ? 'border-pink-500' : 'border-gray-700 hover:border-gray-600'
                }`}
              >
                <Moon className="h-6 w-6 text-blue-400" />
                <span className="text-sm text-gray-300">Dark</span>
              </button>
              <button
                onClick={() => setTheme('system')}
                className={`flex flex-col items-center gap-2 rounded-lg border-2 p-4 transition-colors ${
                  theme === 'system' ? 'border-pink-500' : 'border-gray-700 hover:border-gray-600'
                }`}
              >
                <Monitor className="h-6 w-6 text-gray-400" />
                <span className="text-sm text-gray-300">System</span>
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card className="border-gray-800 bg-gray-900">
          <CardHeader>
            <CardTitle className="text-white">Notifications</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <label className="flex items-center justify-between cursor-pointer">
              <div className="flex items-center gap-3">
                <Bell className="h-5 w-5 text-gray-500" />
                <div>
                  <div className="text-white">Push Notifications</div>
                  <div className="text-sm text-gray-500">Get notified about new messages</div>
                </div>
              </div>
              <input type="checkbox" defaultChecked className="h-4 w-4 rounded bg-gray-800 border-gray-700 text-pink-600" />
            </label>
          </CardContent>
        </Card>

        {/* Privacy */}
        <Card className="border-gray-800 bg-gray-900">
          <CardHeader>
            <CardTitle className="text-white">Privacy & Safety</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <label className="flex items-center justify-between cursor-pointer">
              <div className="flex items-center gap-3">
                <Shield className="h-5 w-5 text-gray-500" />
                <div>
                  <div className="text-white">Show Online Status</div>
                  <div className="text-sm text-gray-500">Let others see when you're online</div>
                </div>
              </div>
              <input type="checkbox" defaultChecked className="h-4 w-4 rounded bg-gray-800 border-gray-700 text-pink-600" />
            </label>
          </CardContent>
        </Card>

        {/* Danger Zone */}
        <Card className="border-red-900/50 bg-gray-900">
          <CardHeader>
            <CardTitle className="text-red-400">Danger Zone</CardTitle>
          </CardHeader>
          <CardContent>
            <Button variant="destructive" className="gap-2">
              <Trash2 className="h-4 w-4" />
              Delete Account
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
