'use client'

import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import { Box, Button, Container } from '@mui/material'
import { styled } from '@mui/material/styles'
import Link from 'next/link'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

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

export default function ContactPage() {
  return (
    <>
      <BackButtonContainer>
        <Container maxWidth="lg">
          <Link href="/" passHref>
            <BackButton startIcon={<ArrowBackIcon />}>
              Back to Home
            </BackButton>
          </Link>
        </Container>
      </BackButtonContainer>
      <Contact />
      {/* 
        NOTE: You can add more contact options here:
        - FAQ section
        - Office hours/availability
        - Response time expectations
        - Alternative contact methods (phone, telegram, etc.)
        - Meeting scheduler integration (Calendly)
        - Map with location
        - Social media feeds
        - Testimonials from clients
      */}
      <Footer />
    </>
  )
}
