'use client'

import React from 'react'
import Link from 'next/link'
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button,
  Chip,
  Stack,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import { useProjects } from '@/hooks'

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

const ProjectsGrid = styled(Grid)(({ theme }) => ({
  marginBottom: '40px',
}))

const ProjectCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: '12px',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)',
  },
}))

const ProjectImage = styled(CardMedia)<{ component?: React.ElementType }>(({ theme }) => ({
  height: '200px',
  borderRadius: '12px 12px 0 0',
}))

const ProjectContent = styled(CardContent)(({ theme }) => ({
  flexGrow: 1,
  padding: '24px',
}))

const ProjectTitle = styled(Typography)(({ theme }) => ({
  fontSize: '20px',
  fontWeight: 600,
  color: theme.palette.text.primary,
  marginBottom: '12px',
}))

const ProjectDescription = styled(Typography)(({ theme }) => ({
  fontSize: '14px',
  color: theme.palette.text.secondary,
  lineHeight: '1.6',
  marginBottom: '16px',
}))

const TechStack = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '8px',
  marginBottom: '16px',
}))

const TechChip = styled(Chip)(({ theme }) => ({
  fontSize: '12px',
  height: '24px',
  backgroundColor: theme.palette.primary.light,
  color: 'white',
  '& .MuiChip-label': {
    padding: '0 8px',
  },
}))

const ProjectActions = styled(CardActions)(({ theme }) => ({
  padding: '0 24px 24px 24px',
  gap: '12px',
}))

const ActionButton = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  fontSize: '14px',
  fontWeight: 500,
  borderRadius: '8px',
  padding: '8px 16px',
  '&.primary': {
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
  },
  '&.secondary': {
    color: theme.palette.primary.main,
    borderColor: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
      color: 'white',
    },
  },
}))

const ViewAllButton = styled(Button)(({ theme }) => ({
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
}))

const Projects: React.FC = () => {
  const { data: projects = [], isLoading } = useProjects()

  const getTechArray = (techString: string) => {
    return techString.split(',').map(tech => tech.trim()).slice(0, 5)
  }

  if (isLoading) {
    return (
      <MainContainer id="projects">
        <Container maxWidth="lg">
          <SectionHeader>
            <SectionTitle variant="h2">Loading Projects...</SectionTitle>
          </SectionHeader>
        </Container>
      </MainContainer>
    )
  }

  return (
    <MainContainer id="projects">
      <Container maxWidth="lg">
        <SectionHeader>
          <SectionTitle variant="h2">
            Projects
          </SectionTitle>
          <SectionSubtitle>
            A showcase of my past work, featuring modern web applications built with cutting-edge technologies.
          </SectionSubtitle>
        </SectionHeader>

        <ProjectsGrid container spacing={4}>
          {projects.slice(0, 3).map((project, index) => (
            <Grid item xs={12} md={4} key={index}>
              <ProjectCard>
                <CardMedia
                  component="img"
                  image={ project.img }
                  alt={ project.title }
                  sx={{
                    height: '200px',
                    borderRadius: '12px 12px 0 0',
                  }}
                />
                <ProjectContent>
                  <ProjectTitle variant="h6">
                    {project.title}
                  </ProjectTitle>
                  <ProjectDescription variant="body2">
                    {project.creation}
                  </ProjectDescription>
                  <TechStack>
                    {getTechArray(project.tech).map((tech, techIndex) => (
                      <TechChip
                        key={techIndex}
                        label={tech}
                        size="small"
                      />
                    ))}
                  </TechStack>
                </ProjectContent>
                <ProjectActions>
                  <ActionButton
                    className="primary"
                    variant="contained"
                    onClick={() => window.open(project.hosted, '_blank', 'noopener,noreferrer')}
                  >
                    Live Demo
                  </ActionButton>
                  <ActionButton
                    className="secondary"
                    variant="outlined"
                    onClick={() => window.open(project.github, '_blank', 'noopener,noreferrer')}
                  >
                    Code
                  </ActionButton>
                </ProjectActions>
              </ProjectCard>
            </Grid>
          ))}
        </ProjectsGrid>

        <Box textAlign="center" mt={4}>
          <Link href="/projects" passHref>
            <ViewAllButton variant="contained">
              View All Projects
            </ViewAllButton>
          </Link>
        </Box>
      </Container>
    </MainContainer>
  )
}

export default Projects
