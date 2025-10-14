'use client'

import React from 'react'
import {
  Box,
  Typography,
  Container,
  Grid,
  Paper,
  Avatar,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import {
  Code,
  Palette,
  Lightbulb,
  EmojiObjects,
} from '@mui/icons-material'

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

const AboutContent = styled(Box)(({ theme }) => ({
  marginBottom: '60px',
}))

const AboutText = styled(Typography)(({ theme }) => ({
  fontSize: '18px',
  color: theme.palette.text.secondary,
  lineHeight: '1.8',
  marginBottom: '24px',
  textAlign: 'center',
  maxWidth: '800px',
  margin: '0 auto 24px auto',
}))

const ValuesGrid = styled(Grid)(({ theme }) => ({
  marginTop: '40px',
}))

const ValueCard = styled(Paper)(({ theme }) => ({
  padding: '32px',
  borderRadius: '12px',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
  height: '100%',
  textAlign: 'center',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)',
  },
}))

const IconContainer = styled(Box)(({ theme }) => ({
  width: '64px',
  height: '64px',
  borderRadius: '50%',
  backgroundColor: theme.palette.primary.main,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 auto 20px auto',
  color: 'white',
  '& .MuiSvgIcon-root': {
    fontSize: '32px',
  },
}))

const ValueTitle = styled(Typography)(({ theme }) => ({
  fontSize: '20px',
  fontWeight: 600,
  color: theme.palette.text.primary,
  marginBottom: '12px',
}))

const ValueDescription = styled(Typography)(({ theme }) => ({
  fontSize: '14px',
  color: theme.palette.text.secondary,
  lineHeight: '1.6',
}))

const About: React.FC = () => {
  const values = [
    {
      icon: <Code />,
      title: 'Clean Code',
      description: "I write code that's easy to read and maintain. My teammates should be able to understand what I built."
    },
    {
      icon: <Palette />,
      title: 'Design Focus',
      description: "Good design matters. If something looks confusing or feels clunky, people won't use it."
    },
    {
      icon: <Lightbulb />,
      title: 'Problem Solving',
      description: 'I like figuring out solutions to tricky problems. Sometimes the simple answer is the best one.'
    },
    {
      icon: <EmojiObjects />,
      title: 'Always Learning',
      description: "Tech changes fast. I keep up with what's new and figure out what's actually useful."
    }
  ]

  return (
    <MainContainer id="about">
      <Container maxWidth="lg">
        <SectionHeader>
          <SectionTitle variant="h2">
            About Me
          </SectionTitle>
        <AboutContent>
          <AboutText>
            Hey, I&apos;m Lucas! I&apos;m a web engineer at Veryable in Dallas, building tools that help 
            businesses manage their workforce more efficiently. I work mostly with React, TypeScript, 
            and Next.js to create features that people actually use every day.
          </AboutText>
          <AboutText>
            Before getting into tech, I ran eight restaurants for about ten years. It was chaotic, 
            rewarding, and taught me a ton about solving real problems under pressure. That experience 
            completely changed how I think about building software. Running those restaurants made me appreciate simple, reliable 
            tools that just work when you need them. The same principles i apply to building software today!
          </AboutText>
          <AboutText>
            I got into coding through DevMountain&apos;s bootcamp in 2022, and honestly haven&apos;t looked back. 
            I love the puzzle-solving aspect of engineering and the satisfaction of shipping something 
            that makes a difference. When I&apos;m not coding, you&apos;ll probably find me exploring Dallas, 
            trying out new restaurants (old habits), or picking up yet an other new hobby! 
          </AboutText>
          </AboutContent>
        </SectionHeader>

        <ValuesGrid container spacing={4}>
          {values.map((value, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <ValueCard>
                <IconContainer>
                  {value.icon}
                </IconContainer>
                <ValueTitle variant="h6">
                  {value.title}
                </ValueTitle>
                <ValueDescription>
                  {value.description}
                </ValueDescription>
              </ValueCard>
            </Grid>
          ))}
        </ValuesGrid>
      </Container>
    </MainContainer>
  )
}

export default About