'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function SettingsPage() {
  const [formData, setFormData] = useState({
    fullName: 'John Doe',
    email: 'john@example.com',
    phone: '(310) 555-0123',
    preferredLocation: 'Beverly Hills, CA',
    budgetMin: '2500000',
    budgetMax: '5000000',
  })

  const [saved, setSaved] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="space-y-8 max-w-2xl">
      <div>
        <h1 className="text-h3 font-display font-light text-text">Settings</h1>
        <p className="text-text-secondary mt-2">Manage your profile and preferences</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
          <CardDescription>Update your personal details</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-text">Full Name</label>
                <Input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="John Doe"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-text">Email</label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-text">Phone</label>
                <Input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="(310) 555-0123"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-text">Preferred Location</label>
                <Input
                  type="text"
                  name="preferredLocation"
                  value={formData.preferredLocation}
                  onChange={handleChange}
                  placeholder="Beverly Hills, CA"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <Button variant="primary" type="submit">
                {saved ? 'Saved!' : 'Save Changes'}
              </Button>
              <Button variant="secondary" type="button">
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Property Preferences</CardTitle>
          <CardDescription>Set your budget and search criteria</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-text">Minimum Budget</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary">$</span>
                  <Input
                    type="text"
                    name="budgetMin"
                    value={formData.budgetMin}
                    onChange={handleChange}
                    placeholder="2,500,000"
                    className="pl-8"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-text">Maximum Budget</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary">$</span>
                  <Input
                    type="text"
                    name="budgetMax"
                    value={formData.budgetMax}
                    onChange={handleChange}
                    placeholder="5,000,000"
                    className="pl-8"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <Button variant="primary" type="submit">
                {saved ? 'Saved!' : 'Save Preferences'}
              </Button>
              <Button variant="secondary" type="button">
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notification Settings</CardTitle>
          <CardDescription>Control how you receive updates</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-primary-dark rounded-lg">
            <div>
              <p className="text-sm font-medium text-text">Email Notifications</p>
              <p className="text-xs text-text-secondary mt-1">Receive alerts via email</p>
            </div>
            <input type="checkbox" defaultChecked className="w-4 h-4" />
          </div>

          <div className="flex items-center justify-between p-4 bg-primary-dark rounded-lg">
            <div>
              <p className="text-sm font-medium text-text">SMS Notifications</p>
              <p className="text-xs text-text-secondary mt-1">Receive alerts via text message</p>
            </div>
            <input type="checkbox" className="w-4 h-4" />
          </div>

          <div className="flex items-center justify-between p-4 bg-primary-dark rounded-lg">
            <div>
              <p className="text-sm font-medium text-text">In-App Notifications</p>
              <p className="text-xs text-text-secondary mt-1">See updates in your dashboard</p>
            </div>
            <input type="checkbox" defaultChecked className="w-4 h-4" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Account</CardTitle>
          <CardDescription>Manage your account security</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-primary-dark rounded-lg">
            <div>
              <p className="text-sm font-medium text-text">Change Password</p>
              <p className="text-xs text-text-secondary mt-1">Update your password regularly</p>
            </div>
            <Button variant="secondary" className="text-xs">
              Change
            </Button>
          </div>

          <div className="flex items-center justify-between p-4 bg-primary-dark rounded-lg">
            <div>
              <p className="text-sm font-medium text-text">Two-Factor Authentication</p>
              <p className="text-xs text-text-secondary mt-1">Add an extra layer of security</p>
            </div>
            <Button variant="secondary" className="text-xs">
              Enable
            </Button>
          </div>

          <div className="flex items-center justify-between p-4 bg-error/10 rounded-lg border border-error/20">
            <div>
              <p className="text-sm font-medium text-error">Delete Account</p>
              <p className="text-xs text-error/70 mt-1">Permanently delete your account and data</p>
            </div>
            <Button variant="ghost" className="text-xs text-error hover:text-error">
              Delete
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
