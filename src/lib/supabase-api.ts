/**
 * Supabase API utility functions
 * These functions fetch data from Supabase database and storage
 */

import { supabase, getImageUrl } from './supabase'
import { Project, BlogPost, SkillCategory, Experience } from '@/types'

/**
 * Fetch all projects from Supabase
 */
export async function getProjects(): Promise<Project[]> {
  if (!supabase) {
    return []
  }

  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('project_number', { ascending: true })

  if (error) {
    console.error('Error fetching projects:', error.message)
    return []
  }

  if (!data) return []

  // Transform database format to app format
  return data.map((project: any) => ({
    project: project.project_number,
    title: project.title,
    img: getImageUrl(project.image_path.replace('/images/', 'images/')),
    creation: project.creation,
    tech: project.tech,
    hosted: project.hosted_url,
    github: project.github_url
  }))
}

/**
 * Fetch all blog posts from Supabase
 */
export async function getBlogPosts(): Promise<BlogPost[]> {
  if (!supabase) {
    return []
  }

  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .order('date', { ascending: false })

  if (error) {
    console.error('Error fetching blog posts:', error.message)
    return []
  }

  if (!data) return []

  // Transform database format to app format
  return data.map((post: any) => ({
    id: post.id,
    title: post.title,
    excerpt: post.excerpt,
    category: post.category,
    date: post.date,
    readTime: post.read_time,
    slug: post.slug
  }))
}

/**
 * Fetch a single blog post by slug
 */
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  if (!supabase) {
    return null
  }

  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error) {
    if (error.code === 'PGRST116') {
      return null
    }
    console.error('Error fetching blog post:', error.message)
    return null
  }

  if (!data) return null

  return {
    id: data.id,
    title: data.title,
    excerpt: data.excerpt,
    category: data.category,
    date: data.date,
    readTime: data.read_time,
    slug: data.slug,
    content: data.content || '' // Include markdown content
  }
}

/**
 * Fetch all skills grouped by category
 */
export async function getSkills(): Promise<SkillCategory[]> {
  if (!supabase) {
    return []
  }

  const { data, error } = await supabase
    .from('skills')
    .select('*')
    .order('category', { ascending: true })

  if (error) {
    console.error('Error fetching skills:', error.message)
    return []
  }

  if (!data) return []

  // Group skills by category and deduplicate
  const categoriesMap = new Map<string, Set<string>>()
  
  data.forEach((skill: any) => {
    if (!categoriesMap.has(skill.category)) {
      categoriesMap.set(skill.category, new Set())
    }
    categoriesMap.get(skill.category)!.add(skill.name)
  })

  // Convert to array format with deduplication
  return Array.from(categoriesMap.entries()).map(([name, skillsSet]) => ({
    name,
    skills: Array.from(skillsSet)
  }))
}

/**
 * Fetch all work experiences
 */
export async function getExperiences(): Promise<Experience[]> {
  if (!supabase) {
    return []
  }

  const { data, error } = await supabase
    .from('experiences')
    .select('*')
    .order('display_order', { ascending: true })

  if (error) {
    console.error('Error fetching experiences:', error.message)
    return []
  }

  if (!data) return []

  return data.map((exp: any) => ({
    title: exp.title,
    company: exp.company,
    period: exp.period,
    description: exp.description
  }))
}

/**
 * Cache duration for static data (in seconds)
 */
export const CACHE_DURATION = {
  projects: 3600, // 1 hour
  blogPosts: 1800, // 30 minutes
  skills: 3600, // 1 hour
  experiences: 3600, // 1 hour
}

