'use client'

import React from 'react'
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
} from '@mui/material'
import { styled } from '@mui/material/styles'
import { projects } from '@/data/projects'

const MainContainer = styled(Box)(({ theme }) => ({
  width: '100vw',
  minHeight: '90vh',
  padding: '50px 0',
}))

const TitleContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  marginBottom: '50px',
})

const ProjectsTitle = styled(Typography)(({ theme }) => ({
  fontSize: '62px',
  background: 'linear-gradient(120deg, rgb(9, 54, 54) 40.69%, purple 40.19%, red 79.69%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  fontWeight: 700,
}))

const ProjectsGrid = styled(Grid)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'center',
  gap: '30px',
  margin: '50px auto',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    alignItems: 'center',
  },
}))

const ProjectCard = styled(Card)(({ theme }) => ({
  maxWidth: 345,
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  transition: 'transform 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
  },
}))

const ProjectTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  textAlign: 'center',
  marginBottom: '16px',
  color: theme.palette.secondary.main,
}))

const SectionTitle = styled(Typography)(({ theme }) => ({
  textAlign: 'center',
  marginBottom: '8px',
  color: theme.palette.secondary.main,
  fontWeight: 600,
}))

const ProjectDescription = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  marginBottom: '16px',
}))

const ActionButton = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  fontSize: '14px',
  fontWeight: 500,
  '& a': {
    color: 'inherit',
    textDecoration: 'none',
  },
}))

const Projects: React.FC = () => {
  return (
    <MainContainer>
      <Container maxWidth="xl">
        <TitleContainer>
          <ProjectsTitle variant="h2">
            Projects
          </ProjectsTitle>
        </TitleContainer>
        <ProjectsGrid container spacing={3}>
          {projects.map((project, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <ProjectCard>
                <Box>
                  <ProjectTitle variant="h5" component="div">
                    {project.title}
                  </ProjectTitle>
                  <CardMedia
                    component="img"
                    height="140"
                    image={project.img}
                    alt={project.title}
                  />
                  <CardContent>
                    <SectionTitle variant="h6">
                      Creation
                    </SectionTitle>
                    <ProjectDescription variant="body2">
                      {project.creation}
                    </ProjectDescription>
                    <SectionTitle variant="h6">
                      Tech
                    </SectionTitle>
                    <ProjectDescription variant="body2">
                      {project.tech}
                    </ProjectDescription>
                  </CardContent>
                </Box>
                <CardActions sx={{ justifyContent: 'center', gap: 1 }}>
                  <ActionButton size="small" color="primary">
                    <a
                      target="_blank"
                      href={project.hosted}
                      rel="noopener noreferrer"
                    >
                      Hosted App
                    </a>
                  </ActionButton>
                  <ActionButton size="small" color="primary">
                    <a
                      target="_blank"
                      href={project.github}
                      rel="noopener noreferrer"
                    >
                      GitHub
                    </a>
                  </ActionButton>
                </CardActions>
              </ProjectCard>
            </Grid>
          ))}
        </ProjectsGrid>
      </Container>
    </MainContainer>
  )
}

export default Projects
