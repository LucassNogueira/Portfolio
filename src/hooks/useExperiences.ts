/**
 * useExperiences Hook
 * 
 * Fetches work experience data from Supabase using React Query
 */

'use client'

import { useQuery } from '@tanstack/react-query'
import { Experience } from '@/types'
import { getExperiences } from '@/lib/supabase-api'

export const useExperiences = () => {
  return useQuery({
    queryKey: ['experiences'],
    queryFn: getExperiences,
  })
}

// Export with typed data for convenience
export const useExperiencesData = () => {
  const { data = [], ...rest } = useExperiences()
  return { experiences: data, ...rest }
}
