import { HeroSection } from '@/components/sections/hero'

export const metadata = {
  title: 'Home | Luxury Real Estate Marketplace',
  description: 'Discover exclusive luxury properties with white-glove concierge service.',
}

export default function Home() {
  return (
    <main className="w-full">
      <HeroSection />
    </main>
  )
}
