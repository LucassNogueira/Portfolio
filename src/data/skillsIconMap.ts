import { IconName } from 'tech-stack-icons'

// Map skill names to tech-stack-icons icon names
export const skillToIconMap: Record<string, IconName | null> = {
  // Frontend
  'React': 'react',
  'Next.js': 'nextjs2',
  'TypeScript': 'typescript',
  'JavaScript': 'js',
  'Material-UI': 'materialui',
  'TanStack': 'reactquery', 
  'HTML5': 'html5',
  'CSS3': 'css3',
  
  // Backend
  'Node.js': 'nodejs',
  'Express': 'expressjs',
  'BFF Pattern': null,
  'REST APIs': null,
  'Event-Driven Microservices': null,
  'PostgreSQL': 'postgresql',
  
  // Tools
  'GitHub': 'github',
  'Postman': 'postman',
  'Axios': null,
  'date-fns': null,
  'Git': 'git',
  'VS Code': 'vscode',
}

// Helper function to get icon name for a skill
export const getIconName = (skill: string): IconName | null => {
  return skillToIconMap[skill] || null
}

