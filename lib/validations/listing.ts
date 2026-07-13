import { z } from 'zod'

export const listingSchema = z.object({
  id: z.string(),
  title: z.string().min(5, 'Title must be at least 5 characters'),
  description: z.string().min(20, 'Description must be at least 20 characters'),
  price: z.number().positive('Price must be positive'),
  bedrooms: z.number().int().min(0),
  bathrooms: z.number().int().min(0),
  squareFeet: z.number().positive('Square feet must be positive'),
  viewingType: z.enum(['open', 'appointment', 'private']),
  address: z.string().min(5, 'Address is required'),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State is required'),
  zipCode: z.string().regex(/^\d{5}(-\d{4})?$/, 'Invalid zip code'),
  latitude: z.number(),
  longitude: z.number(),
  images: z.array(z.string().url()),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
})

export const createListingSchema = listingSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
})

export type Listing = z.infer<typeof listingSchema>
export type CreateListing = z.infer<typeof createListingSchema>
