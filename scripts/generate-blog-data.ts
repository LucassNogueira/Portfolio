/**
 * Build-time script to convert markdown files to JSON
 * This allows us to bundle blog content without needing a database
 */

import fs from 'fs';
import path from 'path';

const BLOG_CONTENT_DIR = path.join(process.cwd(), 'src/content/blog');
const OUTPUT_FILE = path.join(process.cwd(), 'src/data/blogContent.json');

interface BlogPostData {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  slug: string;
  content: string;
}

const BLOG_POSTS: BlogPostData[] = [
  {
    id: 1,
    title: 'nuqs + React Hooks: Managing Modal State Without Losing Your Mind',
    excerpt: 'Managing modal state across components is painful. Learn how using nuqs and custom hooks makes it dead simple - no prop drilling, no context, just URL-based state that works everywhere.',
    category: 'React',
    date: 'Oct 11, 2024',
    readTime: '6 min read',
    slug: 'nuqs-modal-state-hooks',
    content: '',
  },
  {
    id: 2,
    title: 'Building Features Before the Backend Exists (makeMockApiCall)',
    excerpt: 'Stop waiting for backend APIs. Build complete features with realistic mock data, test all edge cases, and swap in the real API later. Here\'s the utility that changed my workflow.',
    category: 'Development',
    date: 'Oct 11, 2024',
    readTime: '8 min read',
    slug: 'make-mock-api-call-utility',
    content: '',
  },
  {
    id: 3,
    title: 'Toast Notifications: Just Call It From Anywhere',
    excerpt: 'No context, no providers, no prop drilling. A toast notification utility you can import and call from anywhere in your app - components, hooks, utilities, or server actions.',
    category: 'React',
    date: 'Oct 11, 2024',
    readTime: '9 min read',
    slug: 'toast-notifications-everywhere',
    content: '',
  },
];

const BLOG_FILES: Record<string, string> = {
  'nuqs-modal-state-hooks': 'nuqs-modal-state-hooks.md',
  'make-mock-api-call-utility': 'make-mock-api-call-utility.md',
  'toast-notifications-everywhere': 'toast-notifications-everywhere.md',
};

async function generateBlogData() {
  console.log('📝 Generating blog content JSON...\n');

  const postsWithContent = BLOG_POSTS.map(post => {
    const filename = BLOG_FILES[post.slug];
    if (!filename) {
      console.warn(`⚠️  No markdown file found for ${post.slug}`);
      return post;
    }

    try {
      const filePath = path.join(BLOG_CONTENT_DIR, filename);
      const content = fs.readFileSync(filePath, 'utf8');
      console.log(`✅ Read ${filename} (${content.length} characters)`);
      
      return {
        ...post,
        content,
      };
    } catch (error) {
      console.error(`❌ Error reading ${filename}:`, error);
      return post;
    }
  });

  // Write to JSON file
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(postsWithContent, null, 2));
  console.log(`\n✨ Generated ${OUTPUT_FILE}`);
  console.log(`📊 Total posts: ${postsWithContent.length}`);
}

generateBlogData().catch(console.error);

