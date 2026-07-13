import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface Offer {
  id: string
  address: string
  offerPrice: number
  listPrice: number
  status: 'pending' | 'accepted' | 'rejected' | 'countered'
  submittedDate: string
  daysOld: number
}

const offers: Offer[] = [
  {
    id: '1',
    address: '456 Oak Avenue, Beverly Hills, CA',
    offerPrice: 3100000,
    listPrice: 3200000,
    status: 'pending',
    submittedDate: '2024-07-11',
    daysOld: 2,
  },
  {
    id: '2',
    address: '789 Sunset Blvd, West Hollywood, CA',
    offerPrice: 2950000,
    listPrice: 2950000,
    status: 'accepted',
    submittedDate: '2024-07-08',
    daysOld: 5,
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case 'pending':
      return 'text-warning bg-warning/10 border-warning/20'
    case 'accepted':
      return 'text-success bg-success/10 border-success/20'
    case 'rejected':
      return 'text-error bg-error/10 border-error/20'
    case 'countered':
      return 'text-info bg-info/10 border-info/20'
    default:
      return 'text-text-secondary bg-text-secondary/10'
  }
}

const getStatusLabel = (status: string) => {
  return status.charAt(0).toUpperCase() + status.slice(1)
}

export default function OffersPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-h3 font-display font-light text-text">Your Offers</h1>
          <p className="text-text-secondary mt-2">{offers.length} active offer{offers.length !== 1 ? 's' : ''}</p>
        </div>
        <Link href="/search" className="block">
          <Button variant="primary">Make New Offer</Button>
        </Link>
      </div>

      <div className="space-y-4">
        {offers.length > 0 ? (
          offers.map((offer) => (
            <Card key={offer.id} className="hover:border-accent/50 transition-colors">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-h6 font-light text-text">{offer.address}</h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                      <div>
                        <p className="text-sm text-text-secondary mb-2">Your Offer</p>
                        <p className="text-h5 font-light text-accent">
                          ${(offer.offerPrice / 1000000).toFixed(2)}M
                        </p>
                      </div>

                      <div>
                        <p className="text-sm text-text-secondary mb-2">List Price</p>
                        <p className="text-h5 font-light text-text">
                          ${(offer.listPrice / 1000000).toFixed(2)}M
                        </p>
                      </div>

                      <div>
                        <p className="text-sm text-text-secondary mb-2">Difference</p>
                        <p
                          className={`text-h5 font-light ${
                            offer.offerPrice < offer.listPrice ? 'text-warning' : 'text-success'
                          }`}
                        >
                          {offer.offerPrice < offer.listPrice ? '-' : '+'}${Math.abs(
                            (offer.listPrice - offer.offerPrice) / 1000000
                          ).toFixed(2)}M
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 flex items-center gap-4 text-sm">
                      <span className="text-text-secondary">Submitted {offer.daysOld} days ago</span>
                      <span
                        className={`px-3 py-1 rounded-full border text-xs font-medium ${getStatusColor(
                          offer.status
                        )}`}
                      >
                        {getStatusLabel(offer.status)}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 ml-6">
                    <Link href={`/listing/${offer.id}`} className="block">
                      <Button variant="secondary" className="w-32">
                        View Property
                      </Button>
                    </Link>
                    {offer.status === 'pending' && (
                      <Button variant="ghost" className="w-32">
                        Withdraw
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-text-secondary mb-6">No active offers yet</p>
              <Link href="/search" className="inline-block">
                <Button variant="primary">Start Browsing Properties</Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
