'use client'

import React from 'react'
import { Box, Typography, Container } from '@mui/material'
import { styled } from '@mui/material/styles'

const HeroContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  minHeight: '100vh',
  backgroundImage: 'url(/images/background1.png)',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  padding: '80px 0',
  [theme.breakpoints.down('md')]: {
    minHeight: '80vh',
    backgroundPosition: '68%',
  },
  [theme.breakpoints.down('sm')]: {
    minHeight: '70vh',
    padding: '60px 0',
  },
}))

const ContentContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  zIndex: 2,
  padding: '0 16px',
  [theme.breakpoints.up('md')]: {
    padding: '0 32px',
  },
  [theme.breakpoints.up('lg')]: {
    padding: '0 64px',
  },
}))

const TitleText = styled(Typography)(({ theme }) => ({
  color: '#1f1f25',
  fontSize: '24px',
  textTransform: 'uppercase',
  letterSpacing: '2px',
  display: 'block',
  marginBottom: '16px',
  background: 'linear-gradient(120deg, rgb(9, 54, 54) 20.69%, purple 50.19%, red 79.69%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  [theme.breakpoints.up('sm')]: {
    fontSize: '32px',
    letterSpacing: '3px',
    marginBottom: '20px',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '40px',
    letterSpacing: '4px',
  },
}))

const MainTitle = styled(Typography)(({ theme }) => ({
  color: '#1f1f25',
  fontSize: '48px',
  fontWeight: 900,
  lineHeight: '1.1',
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    fontSize: '64px',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '80px',
  },
  [theme.breakpoints.up('lg')]: {
    fontSize: '110px',
    lineHeight: '90px',
  },
}))

const HighlightSpan = styled('span')(({ theme }) => ({
  color: theme.palette.primary.main,
}))

const Home: React.FC = () => {
  return (
    <HeroContainer>
      <ContentContainer>
        <TitleText variant="h4">
          Software Developer
        </TitleText>
        <MainTitle variant="h1">
          Howdy, I'm <HighlightSpan>Lucas</HighlightSpan>
        </MainTitle>
      </ContentContainer>
    </HeroContainer>
  )
}

export default Home
