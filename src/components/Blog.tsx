'use client'

import React from 'react'
import Link from 'next/link'
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  Button,
  Chip,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import { blogPosts } from '@/data/blogPosts'

const MainContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  padding: '80px 0',
  backgroundColor: theme.palette.background.default,
}))

const SectionHeader = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  marginBottom: '60px',
}))

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontSize: '48px',
  fontWeight: 700,
  color: theme.palette.text.primary,
  marginBottom: '16px',
  [theme.breakpoints.down('sm')]: {
    fontSize: '36px',
  },
}))

const SectionSubtitle = styled(Typography)(({ theme }) => ({
  fontSize: '18px',
  color: theme.palette.text.secondary,
  maxWidth: '600px',
  margin: '0 auto',
}))

const BlogGrid = styled(Grid)(({ theme }) => ({
  marginBottom: '40px',
  justifyContent: 'center',
}))

const ArticleCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: '8px',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.12)',
  },
}))

const ArticleContent = styled(CardContent)(({ theme }) => ({
  flexGrow: 1,
  padding: '20px',
  '&:last-child': {
    paddingBottom: '20px',
  },
  [theme.breakpoints.down('sm')]: {
    padding: '16px',
    '&:last-child': {
      paddingBottom: '16px',
    },
  },
}))

const ArticleHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  marginBottom: '16px',
  flexWrap: 'wrap',
}))

const CategoryChip = styled(Chip)(({ theme }) => ({
  fontSize: '11px',
  height: '22px',
  backgroundColor: theme.palette.primary.main,
  color: 'white',
  fontWeight: 500,
  '& .MuiChip-label': {
    padding: '0 8px',
  },
}))

const ArticleMeta = styled(Typography)(({ theme }) => ({
  fontSize: '11px',
  color: theme.palette.text.secondary,
  fontWeight: 400,
}))

const ArticleTitle = styled(Typography)(({ theme }) => ({
  fontSize: '18px',
  fontWeight: 600,
  color: theme.palette.text.primary,
  marginBottom: '8px',
  lineHeight: '1.4',
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  [theme.breakpoints.down('sm')]: {
    fontSize: '16px',
  },
}))

const ArticleExcerpt = styled(Typography)(({ theme }) => ({
  fontSize: '14px',
  color: theme.palette.text.secondary,
  lineHeight: '1.5',
  marginBottom: '12px',
  display: '-webkit-box',
  WebkitLineClamp: 3,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  [theme.breakpoints.down('sm')]: {
    fontSize: '13px',
    WebkitLineClamp: 2,
  },
}))

const ReadMoreLink = styled('span')(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  textTransform: 'none',
  fontSize: '13px',
  fontWeight: 600,
  color: theme.palette.primary.main,
  padding: '0',
  textDecoration: 'none',
  cursor: 'pointer',
  transition: 'gap 0.2s ease',
  gap: '4px',
  '&:hover': {
    gap: '8px',
  },
}))

const ViewAllButton = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  fontSize: '16px',
  fontWeight: 600,
  padding: '12px 32px',
  borderRadius: '8px',
  backgroundColor: theme.palette.primary.main,
  color: 'white',
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}))

const Blog: React.FC = () => {
  return (
    <MainContainer id="blog">
      <Container maxWidth="lg">
        <SectionHeader>
          <SectionTitle variant="h2">
            Writing
          </SectionTitle>
          <SectionSubtitle>
            Thoughts on web development, design, and the latest technologies shaping the digital world.
          </SectionSubtitle>
        </SectionHeader>

        <BlogGrid container spacing={3}>
          {blogPosts.slice(0, 4).map((post, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <ArticleCard>
                <ArticleContent>
                  <ArticleHeader>
                    <CategoryChip
                      label={post.category}
                      size="small"
                    />
                    <ArticleMeta>
                      {post.date} • {post.readTime}
                    </ArticleMeta>
                  </ArticleHeader>
                  <ArticleTitle variant="h6">
                    {post.title}
                  </ArticleTitle>
                  <ArticleExcerpt variant="body2">
                    {post.excerpt}
                  </ArticleExcerpt>
                  <Link href={`/blog/${post.slug}`} style={{ textDecoration: 'none' }}>
                    <ReadMoreLink>
                      Read more →
                    </ReadMoreLink>
                  </Link>
                </ArticleContent>
              </ArticleCard>
            </Grid>
          ))}
        </BlogGrid>

        <Box textAlign="center" mt={4}>
          <Link href="/blog" style={{ textDecoration: 'none' }}>
            <ViewAllButton variant="contained">
              View All Posts
            </ViewAllButton>
          </Link>
        </Box>
      </Container>
    </MainContainer>
  )
}

export default Blog
