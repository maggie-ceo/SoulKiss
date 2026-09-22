// src/app/(main)/layout.tsx
'use client'

import { MainLayout } from '@/components/layout/main-layout'

export default function MainGroupLayout({ children }: { children: React.ReactNode }) {
  return <MainLayout>{children}</MainLayout>
}
