'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Container } from '@/components/ui/container'

interface NavItem {
  label: string
  href: string
  icon: string
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard', href: '/agent', icon: '📊' },
  { label: 'Listings', href: '/agent/listings', icon: '🏠' },
  { label: 'Leads', href: '/agent/leads', icon: '👥' },
  { label: 'Pipeline', href: '/agent/pipeline', icon: '📈' },
  { label: 'Calendar', href: '/agent/calendar', icon: '📅' },
  { label: 'Analytics', href: '/agent/analytics', icon: '📉' },
  { label: 'VIP Concierge', href: '/agent/concierge', icon: '⭐' },
]

export default function AgentLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="flex h-screen bg-primary">
      <aside
        className={`${
          sidebarOpen ? 'w-64' : 'w-20'
        } bg-primary-dark border-r border-border transition-all duration-300 flex flex-col`}
      >
        <div className="p-6 border-b border-border">
          <h1 className={`${sidebarOpen ? 'text-h4' : 'text-h6'} font-display font-light text-accent`}>
            {sidebarOpen ? 'Agent Pro' : 'AP'}
          </h1>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-primary transition-colors group"
              title={!sidebarOpen ? item.label : undefined}
            >
              <span className="text-lg">{item.icon}</span>
              {sidebarOpen && <span className="text-sm font-medium text-text-secondary group-hover:text-text">{item.label}</span>}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-border">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="w-full px-3 py-2 text-xs text-text-secondary hover:text-text transition-colors"
            title="Toggle sidebar"
          >
            {sidebarOpen ? '←' : '→'}
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-auto">
        <div className="min-h-screen bg-primary">
          <div className="sticky top-0 z-40 bg-primary border-b border-border">
            <Container className="flex items-center justify-between py-4">
              <h2 className="text-h5 font-light text-text">Agent Dashboard</h2>
              <div className="flex items-center gap-4">
                <div className="text-sm text-text-secondary">
                  <p className="font-medium text-text">Sarah Chen</p>
                  <p className="text-xs">Premium Agent</p>
                </div>
                <button className="w-10 h-10 rounded-full bg-accent/20 hover:bg-accent/30 transition-colors flex items-center justify-center text-sm font-medium text-accent">
                  SC
                </button>
              </div>
            </Container>
          </div>

          <div className="p-6">
            <Container>{children}</Container>
          </div>
        </div>
      </main>
    </div>
  )
}
