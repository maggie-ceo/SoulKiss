// src/app/admin/premium/page.tsx
import { Crown, DollarSign, Users, TrendingUp, CreditCard } from 'lucide-react'

const STATS = [
  { label: 'Premium Users', value: '1,247', change: '+8%', icon: Users, color: 'text-blue-500' },
  { label: 'Monthly Revenue', value: '$12,450', change: '+18%', icon: DollarSign, color: 'text-green-500' },
  { label: 'VIP Users', value: '234', change: '+12%', icon: Crown, color: 'text-yellow-500' },
  { label: 'Conversion Rate', value: '12.2%', change: '+2.1%', icon: TrendingUp, color: 'text-purple-500' },
]

const RECENT_SUBSCRIPTIONS = [
  { id: '1', user: 'cooluser123', plan: 'Premium', amount: '$9.99', date: '2h ago' },
  { id: '2', user: 'nightowl', plan: 'VIP', amount: '$19.99', date: '5h ago' },
  { id: '3', user: 'soulfriend', plan: 'Premium', amount: '$9.99', date: '1d ago' },
  { id: '4', user: 'vipuser', plan: 'VIP', amount: '$19.99', date: '2d ago' },
  { id: '5', user: 'anime_fan', plan: 'Premium', amount: '$9.99', date: '3d ago' },
]

export default function PremiumPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-1">Premium</h1>
        <p className="text-gray-400">Manage subscriptions and revenue</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {STATS.map((stat) => (
          <div key={stat.label} className="rounded-xl border border-gray-800 bg-gray-900 p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">{stat.label}</span>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </div>
            <div className="text-2xl font-bold text-white">{stat.value}</div>
            <div className="text-xs text-green-500 mt-1">{stat.change} from last month</div>
          </div>
        ))}
      </div>

      {/* Recent Subscriptions */}
      <div className="rounded-xl border border-gray-800 bg-gray-900">
        <div className="p-4 border-b border-gray-800">
          <h2 className="text-lg font-semibold text-white">Recent Subscriptions</h2>
        </div>
        <div className="p-4">
          <div className="space-y-3">
            {RECENT_SUBSCRIPTIONS.map((sub) => (
              <div key={sub.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-gray-800 flex items-center justify-center text-sm font-medium text-white">
                    {sub.user[0].toUpperCase()}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white">{sub.user}</div>
                    <div className="text-xs text-gray-500">{sub.plan} • {sub.date}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-green-500">{sub.amount}</span>
                  <CreditCard className="h-4 w-4 text-gray-500" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
