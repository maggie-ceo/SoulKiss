// src/app/(main)/premium/page.tsx
'use client'

import { Button } from '@/components/ui/button'
import { Crown, Check, Sparkles } from 'lucide-react'

const PLANS = [
  {
    id: 'free',
    name: 'Free',
    price: '$0',
    period: 'forever',
    features: ['50 messages/day', '5 characters', 'Basic chat'],
    cta: 'Current Plan',
    disabled: true,
  },
  {
    id: 'premium',
    name: 'Premium',
    price: '$9.99',
    period: '/month',
    popular: true,
    features: ['Unlimited messages', 'Unlimited characters', 'Image generation', 'Voice messages', 'Priority support'],
    cta: 'Get Premium',
    disabled: false,
  },
  {
    id: 'vip',
    name: 'VIP',
    price: '$19.99',
    period: '/month',
    features: ['Everything in Premium', 'Video generation', 'Custom models', 'Early access', '1-on-1 support'],
    cta: 'Get VIP',
    disabled: false,
  },
]

export default function PremiumPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Upgrade Your Experience</h1>
        <p className="text-gray-400">Unlock premium features and enjoy unlimited access</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {PLANS.map((plan) => (
          <div
            key={plan.id}
            className={`rounded-xl p-6 ${
              plan.popular
                ? 'bg-pink-500/10 ring-2 ring-pink-500'
                : 'bg-gray-900'
            }`}
          >
            {plan.popular && (
              <div className="mb-2 flex items-center gap-1 text-pink-500 text-sm font-medium">
                <Sparkles className="h-4 w-4" />
                Most Popular
              </div>
            )}
            <h3 className="text-xl font-semibold text-white mb-1">{plan.name}</h3>
            <div className="mb-4">
              <span className="text-3xl font-bold text-white">{plan.price}</span>
              <span className="text-gray-500 text-sm">{plan.period}</span>
            </div>
            <ul className="mb-6 space-y-2">
              {plan.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-gray-400">
                  <Check className="h-4 w-4 text-pink-500" />
                  {f}
                </li>
              ))}
            </ul>
            <Button
              className="w-full"
              variant={plan.popular ? 'default' : 'outline'}
              disabled={plan.disabled}
            >
              <Crown className="mr-2 h-4 w-4" />
              {plan.cta}
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}
