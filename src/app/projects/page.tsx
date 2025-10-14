'use client'

import Projects from '@/components/Projects'
import Footer from '@/components/Footer'
import { Box, Button, Container, Grid, Card, CardContent, CardMedia, CardActions, Chip, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import Link from 'next/link'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { projects } from '@/data/projects'

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

const AllProjectsSection = styled(Box)(({ theme }) => ({
  width: '100%',
  padding: '80px 0',
  backgroundColor: theme.palette.background.default,
}))

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontSize: '36px',
  fontWeight: 700,
  color: theme.palette.text.primary,
  marginBottom: '40px',
  textAlign: 'center',
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

const ProjectImage = styled(CardMedia)(({ theme }) => ({
  height: '200px',
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

const TechChip = styled(Chip)(({ theme }) => ({
  fontSize: '12px',
  height: '24px',
  backgroundColor: theme.palette.primary.light,
  color: 'white',
  margin: '4px',
}))

const ActionButton = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  fontSize: '14px',
  fontWeight: 500,
  borderRadius: '8px',
}))

export default function ProjectsPage() {
  const getTechArray = (techString: string) => {
    return techString.split(',').map(tech => tech.trim())
  }

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
      
      <Projects />
      
      {/* All Projects Section - Shows ALL projects */}
      <AllProjectsSection>
        <Container maxWidth="lg">
          <SectionTitle variant="h2">
            All Projects
          </SectionTitle>
          <Grid container spacing={4}>
            {projects.map((project, index) => (
              <Grid item xs={12} md={6} lg={4} key={index}>
                <ProjectCard>
                  <CardMedia
                    component="img"
                    image={project.img}
                    alt={project.title}
                    sx={{ height: '200px' }}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <ProjectTitle variant="h6">
                      {project.title}
                    </ProjectTitle>
                    <ProjectDescription variant="body2">
                      {project.creation}
                    </ProjectDescription>
                    <Box>
                      {getTechArray(project.tech).map((tech, techIndex) => (
                        <TechChip
                          key={techIndex}
                          label={tech}
                          size="small"
                        />
                      ))}
                    </Box>
                  </CardContent>
                  <CardActions sx={{ padding: '16px', gap: '8px' }}>
                    <a
                      href={project.hosted}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ textDecoration: 'none' }}
                    >
                      <ActionButton variant="contained">
                        Live Demo
                      </ActionButton>
                    </a>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ textDecoration: 'none' }}
                    >
                      <ActionButton variant="outlined">
                        Code
                      </ActionButton>
                    </a>
                  </CardActions>
                </ProjectCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </AllProjectsSection>
      
      <Footer />
    </>
  )
}
