'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { resetPasswordSchema } from '@/lib/validations/auth'

export default function ResetPasswordPage() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const result = resetPasswordSchema.parse({ email })
      console.log('Reset password request:', result)
      setSuccess(true)
      // TODO: Call reset password API
    } catch (error: any) {
      if (error.errors) {
        setError(error.errors[0]?.message || 'An error occurred')
      }
    } finally {
      setIsLoading(false)
    }
  }

  if (success) {
    return (
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-success/20 flex items-center justify-center mx-auto">
            <span className="text-2xl">✓</span>
          </div>
          <h1 className="text-h3 font-display font-light text-text">Check Your Email</h1>
          <p className="text-base text-text-secondary">
            We've sent a password reset link to your email address. Follow the link to set a new password.
          </p>
        </div>

        <Link href="/login" className="block text-center">
          <Button variant="secondary" className="w-full">
            Back to Sign In
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-h3 font-display font-light text-text">Reset Password</h1>
        <p className="text-base text-text-secondary">Enter your email to receive a password reset link</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-h5">Reset Your Password</CardTitle>
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
              {error && <p className="text-sm text-error">{error}</p>}
            </div>

            <Button variant="primary" className="w-full" disabled={isLoading}>
              {isLoading ? 'Sending...' : 'Send Reset Link'}
            </Button>
          </form>
        </CardContent>
      </Card>

      <p className="text-center text-sm text-text-secondary">
        Remember your password?{' '}
        <Link href="/login" className="text-accent hover:text-accent-dark transition-colors font-medium">
          Sign in
        </Link>
      </p>
    </div>
  )
}
