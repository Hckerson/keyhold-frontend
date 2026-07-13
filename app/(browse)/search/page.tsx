import { Container } from '@/components/ui/container'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Image } from '@/components/ui/image'
import { FilterPanel } from '@/components/patterns/filter-panel'
import { Pagination, PaginationList, PaginationItem, PaginationLink } from '@/components/ui/pagination'
import { Badge } from '@/components/ui/badge'

export const metadata = {
  title: 'Search Properties | Luxury Real Estate',
  description: 'Find your perfect luxury property.',
}

const FILTER_GROUPS = [
  {
    id: 'price',
    label: 'Price Range',
    options: [
      { id: 'under-1m', label: 'Under $1M', count: 45 },
      { id: '1m-2m', label: '$1M - $2M', count: 78 },
      { id: '2m-5m', label: '$2M - $5M', count: 156 },
      { id: '5m-plus', label: '$5M+', count: 89 },
    ],
  },
  {
    id: 'bedrooms',
    label: 'Bedrooms',
    options: [
      { id: '1bed', label: '1 Bedroom', count: 23 },
      { id: '2bed', label: '2 Bedrooms', count: 67 },
      { id: '3bed', label: '3 Bedrooms', count: 145 },
      { id: '4plus', label: '4+ Bedrooms', count: 133 },
    ],
  },
  {
    id: 'type',
    label: 'Property Type',
    options: [
      { id: 'house', label: 'House', count: 234 },
      { id: 'condo', label: 'Condo', count: 89 },
      { id: 'townhouse', label: 'Townhouse', count: 45 },
      { id: 'villa', label: 'Villa', count: 78 },
    ],
  },
]

const LISTINGS = [
  {
    id: '1',
    image: 'https://images.unsplash.com/photo-1494976866556-6812c9d1c72e?w=400&h=300&fit=crop',
    price: 2500000,
    beds: 4,
    baths: 3,
    sqft: 5200,
    address: '123 Beverly Hills Drive',
    city: 'Los Angeles, CA',
    new: true,
  },
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=300&fit=crop',
    price: 1850000,
    beds: 3,
    baths: 2,
    sqft: 4100,
    address: '456 Pacific Heights',
    city: 'San Francisco, CA',
    new: false,
  },
  {
    id: '3',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop',
    price: 3200000,
    beds: 5,
    baths: 4,
    sqft: 6800,
    address: '789 Malibu Crest',
    city: 'Malibu, CA',
    new: true,
  },
]

export default function SearchPage() {
  return (
    <div className="min-h-screen bg-background">
      <Container className="py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filter Panel */}
          <div className="lg:col-span-1">
            <FilterPanel groups={FILTER_GROUPS} title="Refine Search" />
          </div>

          {/* Results */}
          <div className="lg:col-span-3 space-y-8">
            <div className="flex items-center justify-between">
              <h1 className="text-h3 font-display font-light text-text">
                Properties Found
              </h1>
              <select className="px-4 py-2 bg-background-muted border border-border rounded-sm text-text focus:outline-none focus:border-accent">
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Newest First</option>
                <option>Most Popular</option>
              </select>
            </div>

            {/* Listings Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {LISTINGS.map((listing) => (
                <Card key={listing.id} className="overflow-hidden group">
                  <div className="relative overflow-hidden">
                    <Image
                      src={listing.image}
                      alt={listing.address}
                      variant="card"
                      className="group-hover:scale-105 transition-transform duration-300"
                    />
                    {listing.new && (
                      <Badge className="absolute top-4 right-4 bg-accent text-text">
                        New
                      </Badge>
                    )}
                  </div>

                  <CardContent className="p-6 space-y-4">
                    <div className="space-y-2">
                      <h3 className="text-h5 font-body font-normal text-text">
                        ${listing.price.toLocaleString()}
                      </h3>
                      <p className="text-sm text-text-secondary">
                        {listing.address}
                      </p>
                      <p className="text-xs text-text-muted">{listing.city}</p>
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

            {/* Pagination */}
            <div className="flex justify-center py-8">
              <Pagination>
                <PaginationList>
                  <PaginationItem>
                    <PaginationLink href="/search?page=1">
                      ← Previous
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="/search?page=1" isActive>
                      1
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="/search?page=2">2</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="/search?page=3">3</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="/search?page=2">
                      Next →
                    </PaginationLink>
                  </PaginationItem>
                </PaginationList>
              </Pagination>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}
