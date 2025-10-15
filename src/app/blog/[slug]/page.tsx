'use client'

import { useParams } from 'next/navigation'
import { Box, Container, Typography, CircularProgress } from '@mui/material'
import { BlogPostContent } from '@/components/BlogPostContent'
import { useBlogPost } from '@/hooks'

export default function BlogPostPage() {
  const params = useParams()
  const slug = params.slug as string
  const { data: post, isLoading, error } = useBlogPost(slug)

  if (isLoading) {
    return (
      <Container maxWidth="md" sx={{ py: 8, textAlign: 'center' }}>
        <CircularProgress />
        <Typography variant="body1" sx={{ mt: 2 }}>
          Loading blog post...
        </Typography>
      </Container>
    )
  }

  if (error || !post) {
    return (
      <Container maxWidth="md" sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Post Not Found
        </Typography>
        <Typography variant="body1" color="text.secondary">
          The blog post you're looking for doesn't exist.
        </Typography>
      </Container>
    )
  }

  // Use content from Supabase, or fallback to placeholder
  const content = post.content || `# ${post.title}

${post.excerpt}

This is a placeholder for the blog post content. The full content will be added soon.`

  return <BlogPostContent post={post} content={content} />
}
