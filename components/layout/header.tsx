'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background-alt/95 backdrop-blur-sm">
      <Container className="flex items-center justify-between py-4 md:py-6">
        <Link href="/" className="flex items-center space-x-2">
          <div className="flex items-center justify-center w-8 h-8 bg-accent rounded-lg">
            <span className="text-sm font-bold text-text-inverse">LRE</span>
          </div>
          <span className="font-display text-xl font-light text-text hidden sm:inline">
            Luxury RE
          </span>
        </Link>

        <nav className="hidden md:flex gap-8">
          <Link href="/search" className="text-text-secondary hover:text-text transition-colors">
            Search
          </Link>
          <Link href="/about" className="text-text-secondary hover:text-text transition-colors">
            About
          </Link>
          <Link href="/contact" className="text-text-secondary hover:text-text transition-colors">
            Contact
          </Link>
        </nav>

        <div className="flex gap-4">
          <Button variant="secondary" size="sm">
            Sign In
          </Button>
          <Button variant="primary" size="sm">
            Get Started
          </Button>
        </div>
      </Container>
    </header>
  )
}
