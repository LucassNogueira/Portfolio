'use client'

import React from 'react'
import {
  Box,
  Typography,
  Container,
  Grid,
  Button,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material'
import DownloadIcon from '@mui/icons-material/Download'
import { styled } from '@mui/material/styles'
import StackIcon from 'tech-stack-icons'
import { skillCategories } from '@/data/skills'
import { experiences } from '@/data/experience'
import { getIconName } from '@/data/skillsIconMap'
import { useThemeMode } from '@/lib/themeContext'

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

const ResumeHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: '60px',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    gap: '20px',
  },
}))

const DownloadButton = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  fontSize: '16px',
  fontWeight: 600,
  padding: '12px 24px',
  borderRadius: '8px',
  backgroundColor: theme.palette.primary.main,
  color: 'white',
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}))

const SkillsSection = styled(Box)(({ theme }) => ({
  marginBottom: '60px',
}))

const SkillsTitle = styled(Typography)(({ theme }) => ({
  fontSize: '32px',
  fontWeight: 600,
  color: theme.palette.text.primary,
  marginBottom: '32px',
  textAlign: 'center',
}))

const SkillsGrid = styled(Grid)(({ theme }) => ({
  marginBottom: '40px',
}))

const SkillCategoryCard = styled(Paper)(({ theme }) => ({
  padding: '24px',
  borderRadius: '12px',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
  height: '100%',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)',
  },
}))

const CategoryTitle = styled(Typography)(({ theme }) => ({
  fontSize: '20px',
  fontWeight: 600,
  color: theme.palette.text.primary,
  marginBottom: '16px',
  textAlign: 'center',
}))

const SkillsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '16px',
  justifyContent: 'center',
}))

const SkillItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '8px',
  minWidth: '70px',
  maxWidth: '90px',
}))

const IconWrapper = styled(Box)(({ theme }) => ({
  width: '48px',
  height: '48px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '8px',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.1)',
  },
}))

const SkillLabel = styled(Typography)(({ theme }) => ({
  fontSize: '11px',
  fontWeight: 500,
  color: theme.palette.text.secondary,
  textAlign: 'center',
  lineHeight: '1.3',
  wordBreak: 'break-word',
  hyphens: 'auto',
}))

const ExperienceSection = styled(Box)(({ theme }) => ({
  marginBottom: '40px',
}))

const ExperienceTitle = styled(Typography)(({ theme }) => ({
  fontSize: '32px',
  fontWeight: 600,
  color: theme.palette.text.primary,
  marginBottom: '32px',
  textAlign: 'center',
}))

const ExperienceCard = styled(Paper)(({ theme }) => ({
  padding: '24px',
  borderRadius: '12px',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
  marginBottom: '24px',
  position: 'relative',
  '&:not(:last-child)::after': {
    content: '""',
    position: 'absolute',
    left: '24px',
    top: '100%',
    width: '2px',
    height: '24px',
    backgroundColor: theme.palette.primary.light,
  },
}))

const JobTitle = styled(Typography)(({ theme }) => ({
  fontSize: '20px',
  fontWeight: 600,
  color: theme.palette.text.primary,
  marginBottom: '4px',
}))

const CompanyPeriod = styled(Typography)(({ theme }) => ({
  fontSize: '16px',
  color: theme.palette.primary.main,
  fontWeight: 500,
  marginBottom: '12px',
}))

const ExperienceList = styled(List)(({ theme }) => ({
  padding: 0,
}))

const ExperienceListItem = styled(ListItem)(({ theme }) => ({
  padding: '4px 0',
  '& .MuiListItemText-root': {
    margin: 0,
  },
}))

const ExperienceText = styled(Typography)(({ theme }) => ({
  fontSize: '14px',
  color: theme.palette.text.secondary,
  lineHeight: '1.6',
  '&::before': {
    content: '"•"',
    color: theme.palette.primary.main,
    fontWeight: 'bold',
    display: 'inline-block',
    width: '1em',
    marginLeft: '-1em',
  },
}))

const Resume: React.FC = () => {
  const { mode } = useThemeMode()

  return (
    <MainContainer id="resume">
      <Container maxWidth="lg">
        <SectionHeader>
          <SectionTitle variant="h2">
            Resume
          </SectionTitle>
          <SectionSubtitle>
            My professional journey, skills, and experience in software development.
          </SectionSubtitle>
        </SectionHeader>

        <ResumeHeader>
          <DownloadButton 
            variant="contained"
            href="/Lucas%20Nogueira%20%20Software%20Developer%20Resume.pdf"
            startIcon={ <DownloadIcon /> }
            rel="noopener noreferrer"
            sx={ { textDecoration: 'none' } }
            // @ts-ignore - download attribute needed for file download
            download="Lucas-Nogueira-Software-Developer-Resume.pdf"
          >
            Download PDF
          </DownloadButton>
        </ResumeHeader>

        <SkillsSection>
          <SkillsTitle variant="h3">
            Skills
          </SkillsTitle>
          <SkillsGrid container spacing={4} justifyContent="center">
            {skillCategories.map((category, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <SkillCategoryCard>
                  <CategoryTitle variant="h6">
                    {category.name}
                  </CategoryTitle>
                  <SkillsContainer>
                    {category.skills.map((skill, skillIndex) => {
                      const iconName = getIconName(skill)
                      return (
                        <SkillItem key={skillIndex}>
                          <IconWrapper>
                            {iconName ? (
                              <StackIcon name={iconName} variant={mode} />
                            ) : (
                              <Typography 
                                sx={{ 
                                  fontSize: '24px',
                                  fontWeight: 700,
                                  color: 'primary.main',
                                  opacity: 0.7,
                                }}
                              >
                                {skill.charAt(0)}
                              </Typography>
                            )}
                          </IconWrapper>
                          <SkillLabel>{skill}</SkillLabel>
                        </SkillItem>
                      )
                    })}
                  </SkillsContainer>
                </SkillCategoryCard>
              </Grid>
            ))}
          </SkillsGrid>
        </SkillsSection>

        <ExperienceSection>
          <ExperienceTitle variant="h3">
            Experience
          </ExperienceTitle>
          {experiences.map((exp, index) => (
            <ExperienceCard key={index}>
              <JobTitle variant="h6">
                {exp.title}
              </JobTitle>
              <CompanyPeriod variant="body1">
                {exp.company} • {exp.period}
              </CompanyPeriod>
              <ExperienceList>
                {exp.description.map((desc, descIndex) => (
                  <ExperienceListItem key={descIndex}>
                    <ListItemText
                      primary={
                        <ExperienceText variant="body2">
                          {desc}
                        </ExperienceText>
                      }
                    />
                  </ExperienceListItem>
                ))}
              </ExperienceList>
            </ExperienceCard>
          ))}
        </ExperienceSection>

        <ExperienceSection>
          <ExperienceTitle variant="h3">
            Education
          </ExperienceTitle>
          <ExperienceCard>
            <JobTitle variant="h6">
              Full Stack Software Development Program
            </JobTitle>
            <CompanyPeriod variant="body1">
              DevMountain, Dallas, TX • Graduated April 2022
            </CompanyPeriod>
          </ExperienceCard>
          <ExperienceCard>
            <JobTitle variant="h6">
              Bachelor of Business Administration
            </JobTitle>
            <CompanyPeriod variant="body1">
              University of Texas at Arlington • Graduated December 2017
            </CompanyPeriod>
          </ExperienceCard>
        </ExperienceSection>
      </Container>
    </MainContainer>
  )
}

export default Resume
