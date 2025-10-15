'use client'

import Blog from '@/components/Blog'
import Footer from '@/components/Footer'
import { Box, Button, Container, Grid, Card, CardContent, Chip, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import Link from 'next/link'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useBlogPosts } from '@/hooks'

const BackButtonContainer = styled(Box)(({ theme }) => ({
  padding: '20px 0',
  backgroundColor: theme.palette.background.default,
}))

const BackButton = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  fontSize: '16px',
  fontWeight: 500,
  color: theme.palette.text.secondary,
  '&:hover': {
    backgroundColor: 'transparent',
    color: theme.palette.primary.main,
  },
}))

const AllPostsSection = styled(Box)(({ theme }) => ({
  width: '100%',
  padding: '80px 0',
  backgroundColor: theme.palette.background.default,
}))

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontSize: '36px',
  fontWeight: 700,
  color: theme.palette.text.primary,
  marginBottom: '40px',
  textAlign: 'center',
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
  marginTop: '12px',
  textDecoration: 'none',
  cursor: 'pointer',
  transition: 'gap 0.2s ease',
  gap: '4px',
  '&:hover': {
    gap: '8px',
  },
}))

export default function BlogPage() {
  const { data: blogPosts = [], isLoading } = useBlogPosts()

  if (isLoading) {
    return (
      <Box sx={{ textAlign: 'center', py: 10 }}>
        <Typography variant="h4">Loading...</Typography>
      </Box>
    )
  }

  return (
    <>
      <BackButtonContainer>
        <Container maxWidth="lg">
          <Link href="/" style={{ textDecoration: 'none' }}>
            <BackButton startIcon={<ArrowBackIcon />}>
              Back to Home
            </BackButton>
          </Link>
        </Container>
      </BackButtonContainer>
      
      <Blog />
      
      {/* All Blog Posts Section */}
      <AllPostsSection>
        <Container maxWidth="lg">
          <SectionTitle variant="h2">
            All Articles
          </SectionTitle>
          {/* 
            NOTE: This section shows ALL blog posts. You can add:
            - Search functionality
            - Filter by category
            - Sort by date
            - Pagination
            - Full article content
            - Comments section
            - Related posts
            - Author bio
          */}
          <Grid container spacing={3} justifyContent="center">
            {blogPosts.map((post, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <ArticleCard>
                  <CardContent sx={{ p: { xs: 2, sm: 2.5 }, '&:last-child': { pb: { xs: 2, sm: 2.5 } } }}>
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
                  </CardContent>
                </ArticleCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </AllPostsSection>
      
      <Footer />
    </>
  )
}
