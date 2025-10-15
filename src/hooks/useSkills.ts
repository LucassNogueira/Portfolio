/**
 * useSkills Hook
 * 
 * Fetches skills data from Supabase using React Query
 */

'use client'

import { useQuery } from '@tanstack/react-query'
import { SkillCategory } from '@/types'
import { getSkills } from '@/lib/supabase-api'

export const useSkills = () => {
  return useQuery({
    queryKey: ['skills'],
    queryFn: getSkills,
  })
}

// Export with typed data for convenience
export const useSkillsData = () => {
  const { data = [], ...rest } = useSkills()
  return { skills: data, ...rest }
}
