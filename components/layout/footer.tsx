import Link from 'next/link'
import { Container } from '@/components/ui/container'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-background-muted">
      <Container className="py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="space-y-4">
            <h3 className="text-h6 font-body font-semibold text-text">Luxury RE</h3>
            <p className="text-sm text-text-secondary">
              Premium real estate marketplace for discerning buyers and luxury agents.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-text uppercase letter-spacing-wide">
              Properties
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/search" className="text-sm text-text-secondary hover:text-text transition-colors">
                  Browse
                </Link>
              </li>
              <li>
                <Link href="/search?type=luxury" className="text-sm text-text-secondary hover:text-text transition-colors">
                  Luxury Listings
                </Link>
              </li>
              <li>
                <Link href="/search?new=true" className="text-sm text-text-secondary hover:text-text transition-colors">
                  New Listings
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-text uppercase letter-spacing-wide">
              Company
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-sm text-text-secondary hover:text-text transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-sm text-text-secondary hover:text-text transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/press" className="text-sm text-text-secondary hover:text-text transition-colors">
                  Press
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-text uppercase letter-spacing-wide">
              Legal
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="text-sm text-text-secondary hover:text-text transition-colors">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-text-secondary hover:text-text transition-colors">
                  Terms
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-text-secondary hover:text-text transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-text-muted">
            © {currentYear} Luxury Real Estate. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-text-muted hover:text-text transition-colors">
              Twitter
            </a>
            <a href="#" className="text-text-muted hover:text-text transition-colors">
              LinkedIn
            </a>
            <a href="#" className="text-text-muted hover:text-text transition-colors">
              Instagram
            </a>
          </div>
        </div>
      </Container>
    </footer>
  )
}
