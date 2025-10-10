'use client'

import React from 'react'
import Image from 'next/image'
import {
  Box,
  Typography,
  Container,
  Grid,
  Link,
  IconButton,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import Discord from '@/components/svg/Discord'
import Bootstrap from '@/components/svg/Bootstrap'
import CSS from '@/components/svg/CSS'
import ExpressJSDark from '@/components/svg/ExpressJSDark'
import Git from '@/components/svg/Git'
import HTML from '@/components/svg/HTML'
import JavaScript from '@/components/svg/JavaScript'
import MaterialUIDark from '@/components/svg/MaterialUIDark'
import MongoDB from '@/components/svg/MongoDB'
import NodeJSDark from '@/components/svg/NodeJSDark'
import Photoshop from '@/components/svg/Photoshop'
import PostgreSQLDark from '@/components/svg/PostgreSQLDark'
import ReactDark from '@/components/svg/ReactDark'
import Redux from '@/components/svg/Redux'
import TailwindCSSDark from '@/components/svg/TailwindCSSDark'
import VSCodeDark from '@/components/svg/VSCodeDark'

const MainContainer = styled(Box)(({ theme }) => ({
  width: '100vw',
  minHeight: '90vh',
  display: 'flex',
  padding: '60px 0',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    padding: '20px 0',
  },
}))

const LeftSection = styled(Box)(({ theme }) => ({
  width: '25vw',
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  marginLeft: 'auto',
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    marginLeft: 0,
    marginBottom: '40px',
  },
}))

const RightSection = styled(Box)(({ theme }) => ({
  width: '50vw',
  marginRight: 'auto',
  display: 'flex',
  flexDirection: 'column',
  paddingTop: '50px',
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    marginRight: 0,
    paddingTop: 0,
    textAlign: 'center',
  },
}))

const ProfileImage = styled(Image)({
  borderRadius: '50%',
})

const SocialContainer = styled(Box)({
  display: 'flex',
  gap: '10px',
  marginTop: '20px',
})

const SocialIcon = styled(IconButton)({
  padding: '8px',
  '& img': {
    width: '40px',
    height: '40px',
  },
})

const AboutTitle = styled(Typography)(({ theme }) => ({
  fontSize: '35px',
  background: 'linear-gradient(120deg, rgb(9, 54, 54) 2.69%, purple 20.19%, red 63.69%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  marginBottom: '20px',
}))

const SkillsTitle = styled(Typography)(({ theme }) => ({
  fontSize: '35px',
  background: 'linear-gradient(120deg, rgb(9, 54, 54) 2.69%, purple 20.19%, red 63.69%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  marginTop: '40px',
  marginBottom: '20px',
}))

const SkillsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '10px',
  width: '80%',
  [theme.breakpoints.down('sm')]: {
    justifyContent: 'center',
    width: '100%',
  },
}))

const AboutText = styled(Typography)(({ theme }) => ({
  paddingRight: '50px',
  lineHeight: '30px',
  fontWeight: 400,
  [theme.breakpoints.down('sm')]: {
    paddingRight: 0,
    textAlign: 'center',
    padding: '0 15px',
  },
}))

const About: React.FC = () => {
  return (
    <MainContainer>
      <Container maxWidth="xl">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <LeftSection>
              <ProfileImage
                alt="Lucas Nogueira"
                width={300}
                height={300}
                src="/images/head.png"
                priority
              />
              <SocialContainer>
                <Link
                  href="https://github.com/LucassNogueira"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <SocialIcon>
                    <Image
                      alt="GitHub"
                      src="/images/GitHub-Mark-64px.png"
                      width={40}
                      height={40}
                    />
                  </SocialIcon>
                </Link>
                <Link
                  href="https://www.linkedin.com/in/lucas-nogueira-34aa41228/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <SocialIcon>
                    <Image
                      alt="LinkedIn"
                      src="/images/linked.png"
                      width={40}
                      height={40}
                    />
                  </SocialIcon>
                </Link>
                <Link
                  href="https://www.gptx.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <SocialIcon>
                    <Image
                      alt="Texas"
                      src="/images/texas.png"
                      width={40}
                      height={40}
                    />
                  </SocialIcon>
                </Link>
              </SocialContainer>
              <Box sx={{ textAlign: 'center', mt: 2 }}>
                <Typography variant="h3" sx={{ color: '#1f1f25' }}>
                  Lucas Nogueira
                </Typography>
                <Typography variant="h6" sx={{ color: '#1f1f25', mt: 1 }}>
                  Software Developer
                </Typography>
                <Typography variant="h6" sx={{ color: '#1f1f25' }}>
                  BBM Graduate
                </Typography>
                <Typography variant="h6" sx={{ color: '#1f1f25' }}>
                  Pizza Enthusiast
                </Typography>
              </Box>
            </LeftSection>
          </Grid>
          <Grid item xs={12} md={8}>
            <RightSection>
              <AboutTitle variant="h3">
                About Me
              </AboutTitle>
              <AboutText variant="body1">
                My name is Lucas Nogueira, in 2022 I decided to pivot out of a
                position in a restaurant group where I owned and operated 6 units
                across the DFW area for 10 years with two partners. Since childhood
                ive always been interested in computers, either playing video games or
                building computers for friends. I chose to enroll myself in a coding
                bootcamp to begin a new career in software development.
              </AboutText>
              <SkillsTitle variant="h3">
                Skills
              </SkillsTitle>
              <SkillsContainer>
                <ReactDark />
                <JavaScript />
                <HTML />
                <ExpressJSDark />
                <TailwindCSSDark />
                <CSS />
                <NodeJSDark />
                <Git />
                <MaterialUIDark />
                <MongoDB />
                <VSCodeDark />
                <PostgreSQLDark />
                <Photoshop />
                <Redux />
                <Bootstrap />
                <Discord />
              </SkillsContainer>
            </RightSection>
          </Grid>
        </Grid>
      </Container>
    </MainContainer>
  )
}

export default About
