/**
 * useSkills Hook
 * 
 * Fetches skills data from API using React Query
 */

'use client';

import { useQuery } from '@tanstack/react-query';
import { SkillCategory } from '@/types';

const fetchSkills = async (): Promise<SkillCategory[]> => {
  const response = await fetch('/api/skills');
  if (!response.ok) {
    throw new Error('Failed to fetch skills');
  }
  return response.json();
};

export const useSkills = () => {
  return useQuery({
    queryKey: ['skills'],
    queryFn: fetchSkills,
  });
};

// Export with typed data for convenience
export const useSkillsData = () => {
  const { data = [], ...rest } = useSkills();
  return { skills: data, ...rest };
};
