'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { signupSchema } from '@/lib/validations/auth'

export default function SignupPage() {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})
    setIsLoading(true)

    try {
      const result = signupSchema.parse({
        fullName,
        email,
        password,
        confirmPassword,
      })
      console.log('Signup attempt:', result)
      // TODO: Call signup API
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
        <h1 className="text-h3 font-display font-light text-text">Join Luxury RE</h1>
        <p className="text-base text-text-secondary">Create your premium real estate account</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-h5">Create Account</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-text">Full Name</label>
              <Input
                type="text"
                placeholder="John Doe"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                disabled={isLoading}
              />
              {errors.fullName && <p className="text-sm text-error">{errors.fullName}</p>}
            </div>

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

            <div className="space-y-2">
              <label className="text-sm font-medium text-text">Confirm Password</label>
              <Input
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={isLoading}
              />
              {errors.confirmPassword && <p className="text-sm text-error">{errors.confirmPassword}</p>}
            </div>

            <Button variant="primary" className="w-full" disabled={isLoading}>
              {isLoading ? 'Creating account...' : 'Create Account'}
            </Button>
          </form>
        </CardContent>
      </Card>

      <p className="text-center text-sm text-text-secondary">
        Already have an account?{' '}
        <Link href="/login" className="text-accent hover:text-accent-dark transition-colors font-medium">
          Sign in
        </Link>
      </p>
    </div>
  )
}
