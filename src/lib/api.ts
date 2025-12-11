/**
 * API utility functions for Vercel Postgres
 * These functions fetch data from Vercel Postgres database
 */

import { unstable_noStore as noStore } from 'next/cache';
import { sql } from './db';
import { getImageUrl } from './storage';
import { Project, BlogPost, SkillCategory, Experience } from '@/types';

/**
 * Fetch all projects from Vercel Postgres
 */
export async function getProjects(): Promise<Project[]> {
    noStore(); // Prevent static optimization
    try {
        const { rows } = await sql`
            SELECT * FROM projects
            ORDER BY project_number ASC
        `;

        if (!rows || rows.length === 0) return [];

        // Transform database format to app format
        return rows.map((project: any) => ({
            project: project.project_number,
            title: project.title,
            img: getImageUrl(project.image_path.replace('/images/', 'images/')),
            creation: project.creation,
            tech: project.tech,
            hosted: project.hosted_url,
            github: project.github_url
        }));
    } catch (error) {
        console.error('Error fetching projects:', error);
        return [];
    }
}

/**
 * Fetch all blog posts from Vercel Postgres
 */
export async function getBlogPosts(): Promise<BlogPost[]> {
    noStore();
    try {
        const { rows } = await sql`
            SELECT * FROM blog_posts
            ORDER BY date DESC
        `;

        if (!rows || rows.length === 0) return [];

        // Transform database format to app format
        return rows.map((post: any) => ({
            id: post.id,
            title: post.title,
            excerpt: post.excerpt,
            category: post.category,
            date: post.date,
            readTime: post.read_time,
            slug: post.slug
        }));
    } catch (error) {
        console.error('Error fetching blog posts:', error);
        return [];
    }
}

/**
 * Fetch a single blog post by slug
 */
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
    noStore();
    try {
        const { rows } = await sql`
            SELECT * FROM blog_posts
            WHERE slug = ${slug}
            LIMIT 1
        `;

        if (!rows || rows.length === 0) return null;

        const data = rows[0];

        return {
            id: data.id,
            title: data.title,
            excerpt: data.excerpt,
            category: data.category,
            date: data.date,
            readTime: data.read_time,
            slug: data.slug,
            content: data.content || '' // Include markdown content
        };
    } catch (error) {
        console.error('Error fetching blog post:', error);
        return null;
    }
}

/**
 * Fetch all skills grouped by category
 */
export async function getSkills(): Promise<SkillCategory[]> {
    noStore();
    try {
        const { rows } = await sql`
            SELECT * FROM skills
            ORDER BY category ASC
        `;

        if (!rows || rows.length === 0) return [];

        // Group skills by category and deduplicate
        const categoriesMap = new Map<string, Set<string>>();

        rows.forEach((skill: any) => {
            if (!categoriesMap.has(skill.category)) {
                categoriesMap.set(skill.category, new Set());
            }
            categoriesMap.get(skill.category)!.add(skill.name);
        });

        // Convert to array format with deduplication
        return Array.from(categoriesMap.entries()).map(([name, skillsSet]) => ({
            name,
            skills: Array.from(skillsSet)
        }));
    } catch (error) {
        console.error('Error fetching skills:', error);
        return [];
    }
}

/**
 * Fetch all work experiences
 */
export async function getExperiences(): Promise<Experience[]> {
    noStore();
    try {
        const { rows } = await sql`
            SELECT * FROM experiences
            ORDER BY display_order ASC
        `;

        if (!rows || rows.length === 0) return [];

        return rows.map((exp: any) => ({
            title: exp.title,
            company: exp.company,
            period: exp.period,
            description: exp.description
        }));
    } catch (error) {
        console.error('Error fetching experiences:', error);
        return [];
    }
}

/**
 * Cache duration for static data (in seconds)
 */
export const CACHE_DURATION = {
    projects: 3600, // 1 hour
    blogPosts: 1800, // 30 minutes
    skills: 3600, // 1 hour
    experiences: 3600, // 1 hour
};
