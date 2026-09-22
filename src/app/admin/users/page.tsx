// src/app/admin/users/page.tsx
import { Search, Crown, MoreVertical } from 'lucide-react'

const USERS = [
  { id: '1', username: 'cooluser123', email: 'user1@example.com', joined: '2024-09-21', isPremium: true, messages: 1250, status: 'active' },
  { id: '2', username: 'anime_lover', email: 'user2@example.com', joined: '2024-09-20', isPremium: false, messages: 340, status: 'active' },
  { id: '3', username: 'soulfriend', email: 'user3@example.com', joined: '2024-09-19', isPremium: true, messages: 2100, status: 'active' },
  { id: '4', username: 'chatmaster', email: 'user4@example.com', joined: '2024-09-18', isPremium: false, messages: 890, status: 'banned' },
  { id: '5', username: 'nightowl', email: 'user5@example.com', joined: '2024-09-17', isPremium: true, messages: 3200, status: 'active' },
  { id: '6', username: 'newbie42', email: 'user6@example.com', joined: '2024-09-16', isPremium: false, messages: 12, status: 'active' },
  { id: '7', username: 'spammer99', email: 'user7@example.com', joined: '2024-09-15', isPremium: false, messages: 5, status: 'banned' },
  { id: '8', username: 'vipuser', email: 'user8@example.com', joined: '2024-09-14', isPremium: true, messages: 5600, status: 'active' },
]

export default function UsersPage() {
  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Users</h1>
          <p className="text-gray-400">{USERS.length} total users</p>
        </div>
      </div>

      {/* Search */}
      <div className="mb-6 relative">
        <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
        <input
          type="text"
          placeholder="Search users by username or email..."
          className="h-10 w-full rounded-lg border border-gray-800 bg-gray-900 pl-10 pr-4 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
      </div>

      {/* Users Table */}
      <div className="rounded-xl border border-gray-800 bg-gray-900 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-800">
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">User</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">Status</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">Plan</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">Messages</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">Joined</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-400 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {USERS.map((user) => (
              <tr key={user.id} className="hover:bg-gray-800/50">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-gray-800 flex items-center justify-center text-sm font-medium text-white">
                      {user.username[0].toUpperCase()}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-white">{user.username}</div>
                      <div className="text-xs text-gray-500">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                    user.status === 'active' 
                      ? 'bg-green-500/10 text-green-500' 
                      : 'bg-red-500/10 text-red-500'
                  }`}>
                    {user.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  {user.isPremium ? (
                    <span className="flex items-center gap-1 text-yellow-500 text-sm">
                      <Crown className="h-4 w-4" />
                      Premium
                    </span>
                  ) : (
                    <span className="text-sm text-gray-500">Free</span>
                  )}
                </td>
                <td className="px-4 py-3 text-sm text-gray-400">
                  {user.messages.toLocaleString()}
                </td>
                <td className="px-4 py-3 text-sm text-gray-400">
                  {user.joined}
                </td>
                <td className="px-4 py-3 text-right">
                  <button className="p-1 text-gray-400 hover:text-white">
                    <MoreVertical className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
