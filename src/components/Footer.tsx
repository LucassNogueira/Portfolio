'use client'

import React from 'react'
import {
  Box,
  Typography,
  Container,
  Stack,
} from '@mui/material'
import { styled } from '@mui/material/styles'

const FooterContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  padding: '40px 0',
  backgroundColor: theme.palette.background.paper,
  borderTop: `1px solid ${theme.palette.divider}`,
}))

const FooterContent = styled(Container)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    gap: '16px',
    textAlign: 'center',
  },
}))

const CopyrightText = styled(Typography)(({ theme }) => ({
  fontSize: '14px',
  color: theme.palette.text.secondary,
  fontWeight: 400,
}))

const TechStackText = styled(Typography)(({ theme }) => ({
  fontSize: '14px',
  color: theme.palette.text.secondary,
  fontWeight: 400,
}))

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <FooterContent maxWidth="lg">
        <CopyrightText>
          © 2025 Lucas Nogueira. All rights reserved.
        </CopyrightText>
        <TechStackText>
          Built with Next.js & Material-UI
        </TechStackText>
      </FooterContent>
    </FooterContainer>
  )
}

export default Footer
