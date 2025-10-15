# Refactoring Notes

## Recent Changes

### Supabase Integration
- Integrated Supabase for backend data and image storage
- All data now fetched from Supabase instead of local files
- Images stored in Supabase Storage with CDN delivery

### Hooks Pattern
Created custom hooks following the pattern from blog posts:
- `useProjects` - Fetches and manages projects data
- `useBlogPosts` - Fetches and manages blog posts data
- `useSkills` - Fetches and manages skills data
- `useExperiences` - Fetches and manages work experience data

All hooks return:
```typescript
{
  data: T[],
  isLoading: boolean,
  error: Error | null,
  refetch: () => Promise<void>
}
```

### Folder Structure
```
src/
├── hooks/           # Custom hooks (NEW)
│   ├── useProjects.ts
│   ├── useBlogPosts.ts
│   ├── useSkills.ts
│   ├── useExperiences.ts
│   └── index.ts
├── lib/             # Utilities and configs
│   ├── supabase.ts
│   ├── supabase-api.ts
│   ├── atoms.ts
│   └── themeContext.tsx
├── data/            # Data layer (mostly deprecated now)
│   ├── projects.ts       # Deprecated - use useProjects
│   ├── blogPosts.ts      # Deprecated - use useBlogPosts
│   ├── skills.ts         # Deprecated - use useSkills
│   ├── experience.ts     # Deprecated - use useExperiences
│   └── skillsIconMap.ts  # Still used for icon mapping
├── components/      # React components
├── app/            # Next.js app router pages
└── types/          # TypeScript types
```

### Removed
- ❌ Local fallback data from data files
- ❌ Images from `public/images/` (now in Supabase Storage)
- ❌ Blog content markdown files (moved to .dev-notes)

### Component Pattern
All components now use custom hooks:
```typescript
'use client'

import { useProjects } from '@/hooks'

const MyComponent = () => {
  const { projects, isLoading, error } = useProjects()
  
  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>
  
  return <div>{/* render projects */}</div>
}
```

### Migration Scripts
- `npm run migrate:supabase` - Uploads images and populates database
- See `SUPABASE_SETUP.md` for complete setup instructions

### Environment Variables
Required in `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### Next Steps
- Consider adding utils folder for API call utilities (makeApiCall pattern)
- Add error boundaries for better error handling
- Consider adding React Query or SWR for better caching
- Add loading skeletons for better UX

