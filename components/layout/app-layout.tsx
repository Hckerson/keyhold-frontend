import { Header } from './header'
import { Footer } from './footer'

interface AppLayoutProps {
  children: React.ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow w-full">{children}</main>
      <Footer />
    </div>
  )
}
