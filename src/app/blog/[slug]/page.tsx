import fs from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';
import { BlogPostContent } from '@/components/BlogPostContent';
import { blogPosts } from '@/data/blogPosts';
import { Metadata } from 'next';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: `${post.title} | Lucas Nogueira`,
    description: post.excerpt,
    keywords: `${post.category}, react, typescript, web development, lucas nogueira`,
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  // Read the markdown file
  const filePath = path.join(process.cwd(), 'src/data/blogContent', `${params.slug}.md`);
  
  let content = '';
  try {
    content = fs.readFileSync(filePath, 'utf-8');
  } catch (error) {
    notFound();
  }

  return <BlogPostContent post={post} content={content} />;
}
