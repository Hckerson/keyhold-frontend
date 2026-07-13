import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

interface Listing {
  id: string
  address: string
  price: number
  beds: number
  baths: number
  sqft: number
  status: 'active' | 'under-offer' | 'sold'
  listDate: string
  showings: number
  offers: number
}

const listings: Listing[] = [
  {
    id: '1',
    address: '456 Oak Avenue, Beverly Hills, CA',
    price: 3200000,
    beds: 4,
    baths: 3,
    sqft: 5200,
    status: 'active',
    listDate: '2024-06-15',
    showings: 12,
    offers: 2,
  },
  {
    id: '2',
    address: '789 Sunset Blvd, West Hollywood, CA',
    price: 2950000,
    beds: 3,
    baths: 2.5,
    sqft: 4800,
    status: 'under-offer',
    listDate: '2024-05-20',
    showings: 8,
    offers: 1,
  },
  {
    id: '3',
    address: '234 Oak Street, Bel Air, CA',
    price: 4500000,
    beds: 5,
    baths: 4,
    sqft: 6500,
    status: 'active',
    listDate: '2024-07-01',
    showings: 5,
    offers: 0,
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active':
      return 'text-success bg-success/10 border-success/20'
    case 'under-offer':
      return 'text-warning bg-warning/10 border-warning/20'
    case 'sold':
      return 'text-text-secondary bg-text-secondary/10 border-text-secondary/20'
    default:
      return 'text-text-secondary'
  }
}

const getStatusLabel = (status: string) => {
  return status === 'under-offer' ? 'Under Offer' : status.charAt(0).toUpperCase() + status.slice(1)
}

export default function AgentListingsPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-h3 font-display font-light text-text">My Listings</h1>
          <p className="text-text-secondary mt-2">{listings.filter((l) => l.status === 'active').length} active listing{
            listings.filter((l) => l.status === 'active').length !== 1 ? 's' : ''
          }</p>
        </div>
        <Button variant="primary">List New Property</Button>
      </div>

      <div className="space-y-4">
        {listings.map((listing) => (
          <Card key={listing.id} className="hover:border-accent/50 transition-colors">
            <CardContent className="p-6">
              <div className="flex items-start justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-h6 font-light text-text">{listing.address}</h3>
                    <span
                      className={`px-3 py-1 rounded-full border text-xs font-medium ${getStatusColor(
                        listing.status
                      )}`}
                    >
                      {getStatusLabel(listing.status)}
                    </span>
                  </div>

                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-h5 font-light text-accent">${(listing.price / 1000000).toFixed(2)}M</span>
                    <span className="text-xs text-text-secondary">Listed {listing.listDate}</span>
                  </div>

                  <div className="grid grid-cols-3 gap-8 mb-4">
                    <div>
                      <span className="text-text-secondary text-xs">Beds/Baths</span>
                      <p className="text-sm font-medium text-text mt-1">
                        {listing.beds} / {listing.baths}
                      </p>
                    </div>
                    <div>
                      <span className="text-text-secondary text-xs">Sqft</span>
                      <p className="text-sm font-medium text-text mt-1">{listing.sqft.toLocaleString()}</p>
                    </div>
                    <div>
                      <span className="text-text-secondary text-xs">Days on Market</span>
                      <p className="text-sm font-medium text-text mt-1">
                        {Math.floor((new Date().getTime() - new Date(listing.listDate).getTime()) / (1000 * 60 * 60 * 24))}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-8 pt-4 border-t border-border">
                    <div>
                      <span className="text-text-secondary text-xs">Showings</span>
                      <p className="text-h6 font-light text-text mt-1">{listing.showings}</p>
                    </div>
                    <div>
                      <span className="text-text-secondary text-xs">Offers</span>
                      <p className="text-h6 font-light text-accent mt-1">{listing.offers}</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2 ml-6">
                  <Button variant="secondary" className="w-32 text-sm">
                    View Details
                  </Button>
                  <Button variant="ghost" className="w-32 text-sm">
                    Edit
                  </Button>
                  <Button variant="ghost" className="w-32 text-sm">
                    Analytics
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
