export interface Project {
  project: number
  title: string
  img: string
  creation: string
  tech: string
  hosted: string
  github: string
}

export interface Skill {
  name: string
  component: React.ComponentType
}

export interface BlogPost {
  id: number
  title: string
  excerpt: string
  category: string
  date: string
  readTime: string
  slug: string
}

export interface SkillCategory {
  name: string
  skills: string[]
}

export interface Experience {
  title: string
  company: string
  period: string
  description: string[]
}

export interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

export interface ContactFormState {
  isSubmitting: boolean
  successMessage: string
  errorMessage: string
}
