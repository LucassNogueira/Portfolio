/**
 * useBlogPosts Hook
 * 
 * Fetches blog posts data from Supabase using React Query
 */

'use client'

import { useQuery } from '@tanstack/react-query'
import { BlogPost } from '@/types'
import { getBlogPosts, getBlogPostBySlug } from '@/lib/supabase-api'

export const useBlogPosts = () => {
  return useQuery({
    queryKey: ['blogPosts'],
    queryFn: getBlogPosts,
  })
}

// Export with typed data for convenience
export const useBlogPostsData = () => {
  const { data = [], ...rest } = useBlogPosts()
  return { blogPosts: data, ...rest }
}

// Hook for fetching a single blog post by slug
export const useBlogPost = (slug: string) => {
  return useQuery({
    queryKey: ['blogPost', slug],
    queryFn: () => getBlogPostBySlug(slug),
    enabled: !!slug, // Only run query if slug exists
  })
}
