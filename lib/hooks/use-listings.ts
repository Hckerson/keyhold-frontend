'use client'

import { useQuery } from '@tanstack/react-query'
import { listingsAPI } from '@/lib/api/listings'
import { STALE_TIME, CACHE_TIME } from '@/lib/constants'

export function useListings(query: Record<string, unknown>) {
  return useQuery({
    queryKey: ['listings', query],
    queryFn: () => listingsAPI.search(query),
    staleTime: STALE_TIME,
    gcTime: CACHE_TIME,
  })
}

export function useListing(id: string) {
  return useQuery({
    queryKey: ['listings', id],
    queryFn: () => listingsAPI.getById(id),
    enabled: !!id,
    staleTime: STALE_TIME,
    gcTime: CACHE_TIME,
  })
}
