/**
 * useBlogPosts Hook
 * 
 * Returns blog posts data (bundled at build time, no API calls needed)
 */

'use client'

import { useMemo } from 'react'
import { BlogPost } from '@/types'
import { getBlogPosts, getBlogPostBySlug } from '@/data/blogPosts'

export const useBlogPosts = () => {
  const data = useMemo(() => getBlogPosts(), [])
  
  return {
    data,
    isLoading: false,
    error: null,
  }
}

// Export with typed data for convenience
export const useBlogPostsData = () => {
  const { data = [], ...rest } = useBlogPosts()
  return { blogPosts: data, ...rest }
}

// Hook for fetching a single blog post by slug
export const useBlogPost = (slug: string) => {
  const data = useMemo(() => getBlogPostBySlug(slug), [slug])
  
  return {
    data,
    isLoading: false,
    error: data ? null : new Error('Post not found'),
  }
}
