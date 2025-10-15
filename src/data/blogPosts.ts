/**
 * Blog Posts Data
 * Server-side data fetching for blog posts
 */

import { BlogPost } from '@/types'
import { getBlogPosts, getBlogPostBySlug } from '@/lib/supabase-api'

export async function fetchBlogPosts(): Promise<BlogPost[]> {
  return getBlogPosts()
}

export async function fetchBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  return getBlogPostBySlug(slug)
}

