import { Card, CardContent } from '@/components/ui/card'
import { Container } from '@/components/ui/container'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Image } from '@/components/ui/image'

interface Listing {
  id: string
  image: string
  price: number
  beds: number
  baths: number
  sqft: number
  address: string
  featured?: boolean
}

interface FeaturedListingsProps {
  listings: Listing[]
}

export function FeaturedListings({ listings }: FeaturedListingsProps) {
  return (
    <section className="py-16 md:py-24 bg-background">
      <Container>
        <div className="space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-h2 font-display font-light text-text">
              Curated Selections
            </h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Handpicked luxury properties selected for discerning buyers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {listings.map((listing) => (
              <Card key={listing.id} className="overflow-hidden group">
                <div className="relative overflow-hidden">
                  <Image
                    src={listing.image}
                    alt={listing.address}
                    variant="card"
                    className="group-hover:scale-105 transition-transform duration-300"
                  />
                  {listing.featured && (
                    <Badge className="absolute top-4 right-4 bg-accent text-text">
                      Featured
                    </Badge>
                  )}
                </div>

                <CardContent className="p-6 space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-h5 font-body font-normal text-text">
                      ${listing.price.toLocaleString()}
                    </h3>
                    <p className="text-sm text-text-secondary">{listing.address}</p>
                  </div>

                  <div className="flex gap-4 text-sm text-text-muted">
                    <span>{listing.beds} bed{listing.beds !== 1 ? 's' : ''}</span>
                    <span>•</span>
                    <span>{listing.baths} bath{listing.baths !== 1 ? 's' : ''}</span>
                    <span>•</span>
                    <span>{listing.sqft.toLocaleString()} sqft</span>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button variant="primary" size="sm" className="flex-1">
                      View Details
                    </Button>
                    <Button variant="secondary" size="sm" className="flex-1">
                      Save
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center pt-8">
            <Button variant="primary" size="lg">
              Browse All Properties
            </Button>
          </div>
        </div>
      </Container>
    </section>
  )
}
