'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { useAtom } from 'jotai'
import {
  Box,
  Typography,
  Container,
  Grid,
  TextField,
  Button,
  Paper,
  Stack,
  IconButton,
  Alert,
  Snackbar,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import {
  Email,
  LocationOn,
  LinkedIn,
  GitHub,
  Twitter,
} from '@mui/icons-material'
import { contactFormStateAtom } from '@/lib/atoms'
import { ContactFormData } from '@/types'

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

const ContactGrid = styled(Grid)(({ theme }) => ({
  marginBottom: '40px',
}))

const ContactInfoCard = styled(Paper)(({ theme }) => ({
  padding: '40px',
  borderRadius: '12px',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
  height: '100%',
}))

const ContactFormCard = styled(Paper)(({ theme }) => ({
  padding: '40px',
  borderRadius: '12px',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
  height: '100%',
}))

const ContactInfoTitle = styled(Typography)(({ theme }) => ({
  fontSize: '24px',
  fontWeight: 600,
  color: theme.palette.text.primary,
  marginBottom: '24px',
}))

const ContactItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
  marginBottom: '24px',
}))

const ContactIcon = styled(Box)(({ theme }) => ({
  width: '40px',
  height: '40px',
  borderRadius: '50%',
  backgroundColor: theme.palette.primary.main,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'white',
}))

const ContactText = styled(Typography)(({ theme }) => ({
  fontSize: '16px',
  color: theme.palette.text.primary,
  fontWeight: 500,
}))

const SocialLinks = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: '16px',
  marginTop: '32px',
}))

const SocialButton = styled(IconButton)<{ component?: React.ElementType; href?: string; target?: string; rel?: string }>(({ theme }) => ({
  width: '48px',
  height: '48px',
  backgroundColor: theme.palette.primary.main,
  color: 'white',
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}))

const FormTitle = styled(Typography)(({ theme }) => ({
  fontSize: '24px',
  fontWeight: 600,
  color: theme.palette.text.primary,
  marginBottom: '24px',
}))

const FormField = styled(TextField)(({ theme }) => ({
  marginBottom: '20px',
  '& .MuiOutlinedInput-root': {
    borderRadius: '8px',
  },
}))

const SubmitButton = styled(Button)(({ theme }) => ({
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
  '&:disabled': {
    backgroundColor: theme.palette.grey[400],
  },
}))

const Contact: React.FC = () => {
  const [formState, setFormState] = useAtom(contactFormStateAtom)
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactFormData>()

  const onSubmit = async (data: ContactFormData) => {
    setFormState(prev => ({ ...prev, isSubmitting: true, errorMessage: '' }))
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to send message')
      }
      
      setFormState(prev => ({
        ...prev,
        isSubmitting: false,
        successMessage: 'Thank you for your message! I\'ll get back to you soon.',
        errorMessage: ''
      }))
      reset()
    } catch (error) {
      setFormState(prev => ({
        ...prev,
        isSubmitting: false,
        errorMessage: error instanceof Error ? error.message : 'Something went wrong. Please try again.',
        successMessage: ''
      }))
    }
  }

  const handleCloseSnackbar = () => {
    setFormState(prev => ({ ...prev, successMessage: '', errorMessage: '' }))
  }

  return (
    <MainContainer id="contact">
      <Container maxWidth="lg">
        <SectionHeader>
          <SectionTitle variant="h2">
            Get in Touch
          </SectionTitle>
          <SectionSubtitle>
            Have a project in mind or want to collaborate? I&apos;d love to hear from you.
          </SectionSubtitle>
        </SectionHeader>

        <ContactGrid container spacing={4}>
          <Grid item xs={12} md={5}>
            <ContactInfoCard>
              <ContactInfoTitle variant="h5">
                Contact Information
              </ContactInfoTitle>
              
              <ContactItem>
                <ContactIcon>
                  <Email />
                </ContactIcon>
                <ContactText>
                  Howdy@lucasnogueira.dev
                </ContactText>
              </ContactItem>

              <ContactItem>
                <ContactIcon>
                  <LocationOn />
                </ContactIcon>
                <ContactText>
                  Grand Prairie, TX
                </ContactText>
              </ContactItem>

              <SocialLinks>
                <SocialButton component="a" href="https://www.linkedin.com/in/lucas-nogueira-34aa41228/" target="_blank" rel="noopener noreferrer">
                  <LinkedIn />
                </SocialButton>
                <SocialButton component="a" href="https://github.com/LucassNogueira" target="_blank" rel="noopener noreferrer">
                  <GitHub />
                </SocialButton>
              </SocialLinks>
            </ContactInfoCard>
          </Grid>

          <Grid item xs={12} md={7}>
            <ContactFormCard>
              <FormTitle variant="h5">
                Send Message
              </FormTitle>
              
              <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <FormField
                      fullWidth
                      label="Name"
                      variant="outlined"
                      {...register('name', { required: 'Name is required' })}
                      error={!!errors.name}
                      helperText={errors.name?.message}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormField
                      fullWidth
                      label="Email"
                      type="email"
                      variant="outlined"
                      {...register('email', { 
                        required: 'Email is required',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Invalid email address'
                        }
                      })}
                      error={!!errors.email}
                      helperText={errors.email?.message}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormField
                      fullWidth
                      label="Subject"
                      variant="outlined"
                      {...register('subject', { required: 'Subject is required' })}
                      error={!!errors.subject}
                      helperText={errors.subject?.message}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormField
                      fullWidth
                      label="Message"
                      multiline
                      rows={4}
                      variant="outlined"
                      {...register('message', { required: 'Message is required' })}
                      error={!!errors.message}
                      helperText={errors.message?.message}
                    />
                  </Grid>
                </Grid>

                <Box textAlign="center" mt={3}>
                  <SubmitButton
                    type="submit"
                    variant="contained"
                    disabled={formState.isSubmitting}
                  >
                    {formState.isSubmitting ? 'Sending...' : 'Send Message'}
                  </SubmitButton>
                </Box>
              </form>
            </ContactFormCard>
          </Grid>
        </ContactGrid>

        <Snackbar
          open={!!formState.successMessage}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
        >
          <Alert onClose={handleCloseSnackbar} severity="success">
            {formState.successMessage}
          </Alert>
        </Snackbar>

        <Snackbar
          open={!!formState.errorMessage}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
        >
          <Alert onClose={handleCloseSnackbar} severity="error">
            {formState.errorMessage}
          </Alert>
        </Snackbar>
      </Container>
    </MainContainer>
  )
}

export default Contact
