import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Image } from '@/components/ui/image'

interface SavedListing {
  id: string
  image: string
  address: string
  price: number
  beds: number
  baths: number
  sqft: number
  savedDate: string
}

const savedListings: SavedListing[] = [
  {
    id: '1',
    image: '/images/hero.jpg',
    address: '456 Oak Avenue, Beverly Hills, CA',
    price: 3200000,
    beds: 4,
    baths: 3,
    sqft: 5200,
    savedDate: '2 days ago',
  },
  {
    id: '2',
    image: '/images/hero.jpg',
    address: '789 Sunset Blvd, West Hollywood, CA',
    price: 2950000,
    beds: 3,
    baths: 2.5,
    sqft: 4800,
    savedDate: '5 days ago',
  },
  {
    id: '3',
    image: '/images/hero.jpg',
    address: '234 Oak Street, Bel Air, CA',
    price: 4500000,
    beds: 5,
    baths: 4,
    sqft: 6500,
    savedDate: '1 week ago',
  },
]

export default function SavedListingsPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-h3 font-display font-light text-text">Saved Listings</h1>
          <p className="text-text-secondary mt-2">{savedListings.length} properties saved</p>
        </div>
        <Link href="/search" className="block">
          <Button variant="primary">Continue Browsing</Button>
        </Link>
      </div>

      <div className="space-y-4">
        {savedListings.length > 0 ? (
          savedListings.map((listing) => (
            <Link key={listing.id} href={`/listing/${listing.id}`} className="group">
              <Card className="hover:border-accent/50 transition-all overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex gap-6">
                    <div className="w-48 h-48 flex-shrink-0 bg-primary-dark overflow-hidden rounded-l-lg">
                      <Image
                        src={listing.image}
                        alt={listing.address}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        variant="card"
                      />
                    </div>

                    <div className="flex-1 py-6 pr-6 flex flex-col justify-between">
                      <div>
                        <h3 className="text-h6 font-light text-text group-hover:text-accent transition-colors">
                          {listing.address}
                        </h3>

                        <div className="flex items-baseline gap-2 mt-3">
                          <span className="text-h5 font-light text-accent">${(listing.price / 1000000).toFixed(2)}M</span>
                        </div>

                        <div className="flex gap-6 mt-4 text-sm text-text-secondary">
                          <div>
                            <span className="font-medium text-text">{listing.beds}</span> Bed{listing.beds !== 1 ? 's' : ''}
                          </div>
                          <div>
                            <span className="font-medium text-text">{listing.baths}</span> Bath{listing.baths !== 1 ? 's' : ''}
                          </div>
                          <div>
                            <span className="font-medium text-text">{listing.sqft.toLocaleString()}</span> sqft
                          </div>
                        </div>
                      </div>

                      <p className="text-xs text-text-secondary">Saved {listing.savedDate}</p>
                    </div>

                    <div className="pr-6 flex flex-col justify-center gap-3">
                      <Button variant="secondary" className="w-32">
                        View Details
                      </Button>
                      <Button variant="ghost" className="w-32">
                        Remove
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))
        ) : (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-text-secondary mb-6">No saved listings yet</p>
              <Link href="/search" className="inline-block">
                <Button variant="primary">Start Browsing</Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
