'use client'

import React from 'react'
import { Box, Typography, Container, Button, Stack } from '@mui/material'
import { styled, keyframes } from '@mui/material/styles'
import { Link as ScrollLink } from 'react-scroll'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

const HeroContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  minHeight: '100vh',
  background: theme.palette.mode === 'light' 
    ? 'linear-gradient(135deg, #e8e5e1 0%, #d4cfc7 100%)' 
    : 'linear-gradient(135deg, #0a0a0a 0%, #1f1f1f 100%)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  padding: '80px 0',
  [theme.breakpoints.down('md')]: {
    minHeight: '80vh',
    padding: '60px 0',
  },
}))

const ContentContainer = styled(Container)(({ theme }) => ({
  textAlign: 'center',
  maxWidth: '800px',
  position: 'relative',
  zIndex: 2,
}))

const RoleText = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: '18px',
  fontWeight: 400,
  marginBottom: '16px',
  textTransform: 'uppercase',
  letterSpacing: '2px',
  [theme.breakpoints.up('sm')]: {
    fontSize: '20px',
  },
}))

const MainTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontSize: '48px',
  fontWeight: 700,
  lineHeight: '1.2',
  marginBottom: '24px',
  [theme.breakpoints.up('sm')]: {
    fontSize: '64px',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '72px',
  },
  [theme.breakpoints.up('lg')]: {
    fontSize: '80px',
  },
}))

const DescriptionText = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: '18px',
  lineHeight: '1.6',
  marginBottom: '40px',
  maxWidth: '600px',
  margin: '0 auto 40px auto',
  [theme.breakpoints.up('sm')]: {
    fontSize: '20px',
  },
}))

const ButtonContainer = styled(Stack)(({ theme }) => ({
  gap: '16px',
  justifyContent: 'center',
  flexDirection: 'row',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    alignItems: 'center',
  },
}))

const PrimaryButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: 'white',
  padding: '12px 32px',
  fontSize: '16px',
  fontWeight: 600,
  borderRadius: '8px',
  textTransform: 'none',
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}))

const SecondaryButton = styled(Button)(({ theme }) => ({
  color: theme.palette.primary.main,
  borderColor: theme.palette.primary.main,
  padding: '12px 32px',
  fontSize: '16px',
  fontWeight: 600,
  borderRadius: '8px',
  textTransform: 'none',
  '&:hover': {
    backgroundColor: theme.palette.primary.main,
    color: 'white',
  },
}))

const bounce = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(10px);
  }
`

const ScrollIndicator = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  marginTop: '48px',
  cursor: 'pointer',
  animation: `${bounce} 2s ease-in-out infinite`,
  '& svg': {
    fontSize: '48px',
    color: theme.palette.text.secondary,
    opacity: 0.7,
    transition: 'opacity 0.3s ease',
  },
  '&:hover svg': {
    opacity: 1,
  },
}))

const Home: React.FC = () => {
  return (
    <HeroContainer id="home">
      <ContentContainer>
        <RoleText variant="h6">
          Frontend Leaning Full Stack Engineer
        </RoleText>
        <MainTitle variant="h1">
          Building beautiful, functional experiences
        </MainTitle>
        <ButtonContainer>
          <ScrollLink to="contact" smooth={true} duration={800}>
            <SecondaryButton variant="outlined">
              Get in Touch
            </SecondaryButton>
          </ScrollLink>
        </ButtonContainer>
        <ScrollLink to="about" smooth={true} duration={800}>
          <ScrollIndicator>
            <KeyboardArrowDownIcon />
          </ScrollIndicator>
        </ScrollLink>
      </ContentContainer>
    </HeroContainer>
  )
}

export default Home
