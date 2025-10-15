/**
 * useProjects Hook
 * 
 * Fetches projects data from Supabase using React Query
 */

'use client'

import { useQuery } from '@tanstack/react-query'
import { Project } from '@/types'
import { getProjects } from '@/lib/supabase-api'

export const useProjects = () => {
  return useQuery({
    queryKey: ['projects'],
    queryFn: getProjects,
  })
}

// Export with typed data for convenience
export const useProjectsData = () => {
  const { data = [], ...rest } = useProjects()
  return { projects: data, ...rest }
}
