/**
 * useExperiences Hook
 * 
 * Fetches work experience data from API using React Query
 */

'use client';

import { useQuery } from '@tanstack/react-query';
import { Experience } from '@/types';

const fetchExperiences = async (): Promise<Experience[]> => {
  const response = await fetch('/api/experiences');
  if (!response.ok) {
    throw new Error('Failed to fetch experiences');
  }
  return response.json();
};

export const useExperiences = () => {
  return useQuery({
    queryKey: ['experiences'],
    queryFn: fetchExperiences,
  });
};

// Export with typed data for convenience
export const useExperiencesData = () => {
  const { data = [], ...rest } = useExperiences();
  return { experiences: data, ...rest };
};
