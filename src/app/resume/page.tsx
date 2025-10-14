'use client'

import Resume from '@/components/Resume'
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

export default function ResumePage() {
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
      <Resume />
      {/* 
        NOTE: You can add more detailed resume content here:
        - Detailed job descriptions
        - Project highlights for each role
        - Education details (courses, GPA, honors)
        - Certifications with dates and issuers
        - Volunteer work
        - Publications
        - Speaking engagements
        - Professional development courses
        - Skill proficiency levels
        - Language proficiency
      */}
      <Footer />
    </>
  )
}
