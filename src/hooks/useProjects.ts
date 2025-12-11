/**
 * useProjects Hook
 * 
 * Fetches projects data from API using React Query
 */

'use client';

import { useQuery } from '@tanstack/react-query';
import { Project } from '@/types';

const fetchProjects = async (): Promise<Project[]> => {
  const response = await fetch('/api/projects');
  if (!response.ok) {
    throw new Error('Failed to fetch projects');
  }
  return response.json();
};

export const useProjects = () => {
  return useQuery({
    queryKey: ['projects'],
    queryFn: fetchProjects,
  });
};

// Export with typed data for convenience
export const useProjectsData = () => {
  const { data = [], ...rest } = useProjects();
  return { projects: data, ...rest };
};
