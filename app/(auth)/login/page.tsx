'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { loginSchema } from '@/lib/validations/auth'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})
    setIsLoading(true)

    try {
      const result = loginSchema.parse({ email, password })
      console.log('Login attempt:', result)
      // TODO: Call login API
    } catch (error: any) {
      if (error.errors) {
        const newErrors: Record<string, string> = {}
        error.errors.forEach((err: any) => {
          if (err.path[0]) {
            newErrors[err.path[0]] = err.message
          }
        })
        setErrors(newErrors)
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-h3 font-display font-light text-text">Welcome Back</h1>
        <p className="text-base text-text-secondary">Sign in to your luxury real estate account</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-h5">Sign In</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-text">Email</label>
              <Input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
              />
              {errors.email && <p className="text-sm text-error">{errors.email}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-text">Password</label>
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
              {errors.password && <p className="text-sm text-error">{errors.password}</p>}
            </div>

            <Button variant="primary" className="w-full" disabled={isLoading}>
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <Link
          href="/reset-password"
          className="block text-center text-sm text-text-secondary hover:text-accent transition-colors"
        >
          Forgot your password?
        </Link>

        <p className="text-center text-sm text-text-secondary">
          Don't have an account?{' '}
          <Link href="/signup" className="text-accent hover:text-accent-dark transition-colors font-medium">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}
