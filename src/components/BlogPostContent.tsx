'use client';

import React from 'react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import {
  Box,
  Container,
  Typography,
  Chip,
  Button,
  Paper,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { BlogPost } from '@/types';
import Footer from './Footer';

// Import highlight.js theme
import 'highlight.js/styles/atom-one-dark.css';

interface BlogPostContentProps {
  post: BlogPost;
  content: string;
}

const BackButtonContainer = styled(Box)(({ theme }) => ({
  padding: '20px 0',
  backgroundColor: theme.palette.background.default,
}));

const BackButton = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  fontSize: '16px',
  fontWeight: 500,
  color: theme.palette.text.secondary,
  '&:hover': {
    backgroundColor: 'transparent',
    color: theme.palette.primary.main,
  },
}));

const ArticleContainer = styled(Box)(({ theme }) => ({
  padding: '80px 0',
  backgroundColor: theme.palette.background.default,
  minHeight: '100vh',
}));

const ArticleHeader = styled(Box)(({ theme }) => ({
  marginBottom: '48px',
  textAlign: 'center',
}));

const ArticleTitle = styled(Typography)(({ theme }) => ({
  fontSize: '48px',
  fontWeight: 700,
  color: theme.palette.text.primary,
  marginBottom: '16px',
  lineHeight: '1.2',
  [theme.breakpoints.down('sm')]: {
    fontSize: '36px',
  },
}));

const ArticleMeta = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '16px',
  marginTop: '24px',
  flexWrap: 'wrap',
}));

const MetaText = styled(Typography)(({ theme }) => ({
  fontSize: '14px',
  color: theme.palette.text.secondary,
  fontWeight: 500,
}));

const CategoryChip = styled(Chip)(({ theme }) => ({
  fontSize: '14px',
  height: '28px',
  backgroundColor: theme.palette.primary.main,
  color: 'white',
  fontWeight: 600,
}));

const ArticleContent = styled(Paper)(({ theme }) => ({
  padding: '48px',
  borderRadius: '12px',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
  [theme.breakpoints.down('sm')]: {
    padding: '24px',
  },
  
  // Markdown styling
  '& h1': {
    fontSize: '42px',
    fontWeight: 700,
    color: theme.palette.text.primary,
    marginTop: '48px',
    marginBottom: '24px',
    lineHeight: '1.2',
  },
  '& h2': {
    fontSize: '32px',
    fontWeight: 600,
    color: theme.palette.text.primary,
    marginTop: '40px',
    marginBottom: '20px',
    lineHeight: '1.3',
  },
  '& h3': {
    fontSize: '24px',
    fontWeight: 600,
    color: theme.palette.text.primary,
    marginTop: '32px',
    marginBottom: '16px',
  },
  '& p': {
    fontSize: '18px',
    lineHeight: '1.8',
    color: theme.palette.text.secondary,
    marginBottom: '24px',
  },
  '& ul, & ol': {
    fontSize: '18px',
    lineHeight: '1.8',
    color: theme.palette.text.secondary,
    marginBottom: '24px',
    paddingLeft: '32px',
  },
  '& li': {
    marginBottom: '12px',
  },
  '& code': {
    backgroundColor: theme.palette.mode === 'light' ? '#f5f5f5' : '#2d2d2d',
    padding: '2px 6px',
    borderRadius: '4px',
    fontSize: '16px',
    fontFamily: '"Fira Code", "Consolas", "Monaco", monospace',
  },
  '& pre': {
    backgroundColor: theme.palette.mode === 'light' ? '#282c34' : '#1e1e1e',
    padding: '24px',
    borderRadius: '12px',
    overflow: 'auto',
    marginBottom: '24px',
    '& code': {
      backgroundColor: 'transparent',
      padding: 0,
      color: '#abb2bf',
      fontSize: '14px',
      lineHeight: '1.6',
    },
  },
  '& blockquote': {
    borderLeft: `4px solid ${theme.palette.primary.main}`,
    paddingLeft: '24px',
    marginLeft: 0,
    fontStyle: 'italic',
    color: theme.palette.text.secondary,
  },
  '& a': {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    fontWeight: 500,
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  '& hr': {
    border: 'none',
    height: '1px',
    backgroundColor: theme.palette.divider,
    margin: '48px 0',
  },
  '& table': {
    width: '100%',
    borderCollapse: 'collapse',
    marginBottom: '24px',
  },
  '& th, & td': {
    padding: '12px',
    borderBottom: `1px solid ${theme.palette.divider}`,
    textAlign: 'left',
  },
  '& th': {
    fontWeight: 600,
    backgroundColor: theme.palette.mode === 'light' ? '#f5f5f5' : '#2d2d2d',
  },
}));

export const BlogPostContent: React.FC<BlogPostContentProps> = ({ post, content }) => {
  return (
    <>
      <BackButtonContainer>
        <Container maxWidth="lg">
          <Link href="/blog" passHref>
            <BackButton startIcon={<ArrowBackIcon />}>
              Back to Blog
            </BackButton>
          </Link>
        </Container>
      </BackButtonContainer>

      <ArticleContainer>
        <Container maxWidth="md">
          <ArticleHeader>
            <CategoryChip label={post.category} />
            <ArticleTitle variant="h1">
              {post.title}
            </ArticleTitle>
            <ArticleMeta>
              <MetaText>{post.date}</MetaText>
              <MetaText>•</MetaText>
              <MetaText>{post.readTime}</MetaText>
            </ArticleMeta>
          </ArticleHeader>

          <ArticleContent>
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight]}
            >
              {content}
            </ReactMarkdown>
          </ArticleContent>
        </Container>
      </ArticleContainer>

      <Footer />
    </>
  );
};
