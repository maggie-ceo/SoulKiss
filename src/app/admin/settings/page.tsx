// src/app/admin/settings/page.tsx
import { Save, Globe, Mail, Shield, Palette } from 'lucide-react'

export default function SettingsPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-1">Settings</h1>
        <p className="text-gray-400">Configure your SoulKiss platform</p>
      </div>

      <div className="space-y-6">
        {/* General Settings */}
        <div className="rounded-xl border border-gray-800 bg-gray-900">
          <div className="p-4 border-b border-gray-800 flex items-center gap-2">
            <Globe className="h-5 w-5 text-gray-400" />
            <h2 className="text-lg font-semibold text-white">General</h2>
          </div>
          <div className="p-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Site Name</label>
              <input
                type="text"
                defaultValue="SoulKiss"
                className="h-10 w-full rounded-lg border border-gray-800 bg-gray-900 px-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Site URL</label>
              <input
                type="text"
                defaultValue="https://soulkiss.app"
                className="h-10 w-full rounded-lg border border-gray-800 bg-gray-900 px-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Support Email</label>
              <input
                type="email"
                defaultValue="support@soulkiss.app"
                className="h-10 w-full rounded-lg border border-gray-800 bg-gray-900 px-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>
          </div>
        </div>

        {/* Email Settings */}
        <div className="rounded-xl border border-gray-800 bg-gray-900">
          <div className="p-4 border-b border-gray-800 flex items-center gap-2">
            <Mail className="h-5 w-5 text-gray-400" />
            <h2 className="text-lg font-semibold text-white">Email</h2>
          </div>
          <div className="p-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">SMTP Host</label>
              <input
                type="text"
                defaultValue="smtp.mailgun.org"
                className="h-10 w-full rounded-lg border border-gray-800 bg-gray-900 px-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">SMTP Port</label>
              <input
                type="text"
                defaultValue="587"
                className="h-10 w-full rounded-lg border border-gray-800 bg-gray-900 px-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>
          </div>
        </div>

        {/* Security */}
        <div className="rounded-xl border border-gray-800 bg-gray-900">
          <div className="p-4 border-b border-gray-800 flex items-center gap-2">
            <Shield className="h-5 w-5 text-gray-400" />
            <h2 className="text-lg font-semibold text-white">Security</h2>
          </div>
          <div className="p-4 space-y-4">
            <label className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-white">Require Email Verification</div>
                <div className="text-xs text-gray-500">Users must verify email before chatting</div>
              </div>
              <input type="checkbox" className="h-4 w-4 rounded bg-gray-800 border-gray-700 text-pink-600" />
            </label>
            <label className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-white">NSFW Content Filter</div>
                <div className="text-xs text-gray-500">Block explicit content in chat</div>
              </div>
              <input type="checkbox" defaultChecked className="h-4 w-4 rounded bg-gray-800 border-gray-700 text-pink-600" />
            </label>
            <label className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-white">Rate Limiting</div>
                <div className="text-xs text-gray-500">Limit messages per minute per user</div>
              </div>
              <input type="checkbox" defaultChecked className="h-4 w-4 rounded bg-gray-800 border-gray-700 text-pink-600" />
            </label>
          </div>
        </div>

        {/* Appearance */}
        <div className="rounded-xl border border-gray-800 bg-gray-900">
          <div className="p-4 border-b border-gray-800 flex items-center gap-2">
            <Palette className="h-5 w-5 text-gray-400" />
            <h2 className="text-lg font-semibold text-white">Appearance</h2>
          </div>
          <div className="p-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Primary Color</label>
              <div className="flex gap-2">
                <input
                  type="color"
                  defaultValue="#ec4899"
                  className="h-10 w-16 rounded-lg border border-gray-800 bg-gray-900 cursor-pointer"
                />
                <input
                  type="text"
                  defaultValue="#ec4899"
                  className="h-10 flex-1 rounded-lg border border-gray-800 bg-gray-900 px-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Default Theme</label>
              <select className="h-10 w-full rounded-lg border border-gray-800 bg-gray-900 px-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-pink-500">
                <option value="dark">Dark</option>
                <option value="light">Light</option>
                <option value="system">System</option>
              </select>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button className="flex items-center gap-2 rounded-lg bg-pink-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-pink-700 transition-colors">
            <Save className="h-4 w-4" />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  )
}
