import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

interface User {
  id: string
  name: string
  email: string
  role: 'buyer' | 'agent' | 'admin'
  tier: 'standard' | 'premium' | 'platinum'
  joinDate: string
  status: 'active' | 'suspended' | 'inactive'
  transactions: number
}

const users: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'buyer',
    tier: 'standard',
    joinDate: '2024-01-15',
    status: 'active',
    transactions: 2,
  },
  {
    id: '2',
    name: 'Sarah Chen',
    email: 'sarah@example.com',
    role: 'agent',
    tier: 'premium',
    joinDate: '2023-06-20',
    status: 'active',
    transactions: 15,
  },
  {
    id: '3',
    name: 'Robert Astor',
    email: 'robert@example.com',
    role: 'buyer',
    tier: 'platinum',
    joinDate: '2023-03-10',
    status: 'active',
    transactions: 5,
  },
  {
    id: '4',
    name: 'Marcus Sterling',
    email: 'marcus@example.com',
    role: 'agent',
    tier: 'standard',
    joinDate: '2024-05-01',
    status: 'suspended',
    transactions: 0,
  },
]

const getRoleColor = (role: string) => {
  switch (role) {
    case 'admin':
      return 'text-error bg-error/10'
    case 'agent':
      return 'text-accent bg-accent/10'
    case 'buyer':
      return 'text-info bg-info/10'
    default:
      return 'text-text-secondary'
  }
}

const getTierColor = (tier: string) => {
  switch (tier) {
    case 'platinum':
      return 'text-accent'
    case 'premium':
      return 'text-info'
    case 'standard':
      return 'text-text-secondary'
    default:
      return 'text-text-secondary'
  }
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active':
      return 'text-success bg-success/10 border-success/20'
    case 'suspended':
      return 'text-error bg-error/10 border-error/20'
    case 'inactive':
      return 'text-text-secondary bg-text-secondary/10 border-text-secondary/20'
    default:
      return 'text-text-secondary'
  }
}

export default function AdminUsersPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-h3 font-display font-light text-text">User Management</h1>
          <p className="text-text-secondary mt-2">
            {users.filter((u) => u.status === 'active').length} active user{users.filter((u) => u.status === 'active').length !== 1 ? 's' : ''}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" className="text-sm">
            Filter
          </Button>
          <Button variant="primary" className="text-sm">
            Add User
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {users.map((user) => (
          <Card key={user.id} className="hover:border-accent/50 transition-colors">
            <CardContent className="p-6">
              <div className="flex items-start justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-medium text-accent">
                        {user.name.split(' ').map((n) => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-h6 font-light text-text">{user.name}</h3>
                      <p className="text-sm text-text-secondary">{user.email}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 py-4 border-y border-border">
                    <div>
                      <p className="text-xs text-text-secondary mb-1">Role</p>
                      <p className={`text-sm font-medium ${getRoleColor(user.role)}`}>
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-text-secondary mb-1">Tier</p>
                      <p className={`text-sm font-medium ${getTierColor(user.tier)}`}>
                        {user.tier.charAt(0).toUpperCase() + user.tier.slice(1)}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-text-secondary mb-1">Joined</p>
                      <p className="text-sm font-medium text-text">{user.joinDate}</p>
                    </div>

                    <div>
                      <p className="text-xs text-text-secondary mb-1">Transactions</p>
                      <p className="text-sm font-medium text-text">{user.transactions}</p>
                    </div>
                  </div>

                  <div className="mt-3">
                    <span className={`inline-block px-3 py-1 rounded-full border text-xs font-medium ${getStatusColor(user.status)}`}>
                      {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-2 ml-6">
                  <Button variant="secondary" className="w-32 text-sm">
                    View Profile
                  </Button>
                  {user.status === 'active' && (
                    <Button variant="ghost" className="w-32 text-sm text-error">
                      Suspend
                    </Button>
                  )}
                  {user.status === 'suspended' && (
                    <Button variant="secondary" className="w-32 text-sm">
                      Reactivate
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
