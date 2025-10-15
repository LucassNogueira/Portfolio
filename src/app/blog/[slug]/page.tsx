import { notFound } from 'next/navigation';
import { BlogPostContent } from '@/components/BlogPostContent';
import { fetchBlogPosts, fetchBlogPostBySlug } from '@/data/blogPosts';
import { Metadata } from 'next';

export const runtime = 'edge';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const blogPosts = await fetchBlogPosts();
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await fetchBlogPostBySlug(slug);

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

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await fetchBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Use content from Supabase, or fallback to placeholder
  const content = post.content || `# ${post.title}

${post.excerpt}

This is a placeholder for the blog post content. The full content will be added soon.`;

  return <BlogPostContent post={post} content={content} />;
}
