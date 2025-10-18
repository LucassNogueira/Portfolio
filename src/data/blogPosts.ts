/**
 * Blog Posts Data
 * Content is bundled at build time from markdown files
 */

import { BlogPost } from '@/types'
import blogContent from './blogContent.json'

// Type assertion for the imported JSON
const typedBlogContent = blogContent as (BlogPost & { content: string })[]

export function getBlogPosts(): BlogPost[] {
  // Return metadata only (without full content)
  return typedBlogContent.map(({ id, title, excerpt, category, date, readTime, slug }) => ({
    id,
    title,
    excerpt,
    category,
    date,
    readTime,
    slug,
  }))
}

export function getBlogPostBySlug(slug: string): (BlogPost & { content: string }) | null {
  const post = typedBlogContent.find(p => p.slug === slug)
  return post || null
}

