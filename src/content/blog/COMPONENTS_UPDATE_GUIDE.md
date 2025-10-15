# Component Update Guide for Supabase Integration

Your data files have been updated to fetch from Supabase, but your components still use the old static imports. This guide shows exactly what needs to be changed.

## 📝 Files That Need Updates

The following files are currently importing static data arrays and need to be updated to use async functions:

1. ✏️ `src/app/projects/page.tsx`
2. ✏️ `src/components/Projects.tsx`
3. ✏️ `src/app/blog/page.tsx`
4. ✏️ `src/components/Blog.tsx`
5. ✏️ `src/components/Resume.tsx`
6. ✏️ `src/app/blog/[slug]/page.tsx`

---

## 🔄 Update Pattern

### Old Way (Static Data)
```typescript
import { projects } from '@/data/projects'
// projects is immediately available
```

### New Way (Async Data from Supabase)
```typescript
import { fetchProjects } from '@/data/projects'
// fetchProjects() returns a Promise
const projects = await fetchProjects()
```

---

## 📋 Specific File Updates

### 1. `src/app/projects/page.tsx`

**Current (Line 9):**
```typescript
import { projects } from '@/data/projects'
```

**Change to:**
```typescript
import { fetchProjects } from '@/data/projects'
```

**Current (Line 87-91):**
```typescript
export default function ProjectsPage() {
  const getTechArray = (techString: string) => {
    return techString.split(',').map(tech => tech.trim())
  }
```

**Change to:**
```typescript
export default async function ProjectsPage() {
  const projects = await fetchProjects()
  
  const getTechArray = (techString: string) => {
    return techString.split(',').map(tech => tech.trim())
  }
```

---

### 2. `src/components/Projects.tsx`

**Current (Line 19):**
```typescript
import { projects } from '@/data/projects'
```

**Change to:**
```typescript
import { fetchProjects } from '@/data/projects'
```

**Current (Line 148):**
```typescript
const Projects: React.FC = () => {
```

**Change to Option A (Async Component - Recommended):**
```typescript
const Projects = async () => {
  const projects = await fetchProjects()
```

**OR Option B (Keep as Client Component with State):**
```typescript
'use client'
// ... other imports
import { useState, useEffect } from 'react'
import { fetchProjects } from '@/data/projects'
import { Project } from '@/types'

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => {
    fetchProjects()
      .then(setProjects)
      .finally(() => setIsLoading(false))
  }, [])
  
  if (isLoading) {
    return <div>Loading...</div>
  }
```

---

### 3. `src/app/blog/page.tsx`

**Current (Line 9):**
```typescript
import { blogPosts } from '@/data/blogPosts'
```

**Change to:**
```typescript
import { fetchBlogPosts } from '@/data/blogPosts'
```

**Current (Line 126):**
```typescript
export default function BlogPage() {
```

**Change to:**
```typescript
export default async function BlogPage() {
  const blogPosts = await fetchBlogPosts()
```

---

### 4. `src/components/Blog.tsx`

**Current (Line 16):**
```typescript
import { blogPosts } from '@/data/blogPosts'
```

**Change to:**
```typescript
import { fetchBlogPosts } from '@/data/blogPosts'
```

**Current (Line 163):**
```typescript
const Blog: React.FC = () => {
```

**Change to:**
```typescript
const Blog = async () => {
  const blogPosts = await fetchBlogPosts()
```

---

### 5. `src/components/Resume.tsx`

You'll need to check this file for imports from:
- `@/data/experience` → Change to `fetchExperiences()`
- `@/data/skills` → Change to `fetchSkills()`

**Expected changes:**
```typescript
// OLD
import { experiences } from '@/data/experience'
import { skillCategories } from '@/data/skills'

// NEW
import { fetchExperiences } from '@/data/experience'
import { fetchSkills } from '@/data/skills'

// In component
const Resume = async () => {
  const experiences = await fetchExperiences()
  const skillCategories = await fetchSkills()
  // ... rest of component
```

---

### 6. `src/app/blog/[slug]/page.tsx`

This likely needs to fetch a single blog post by slug.

**Expected changes:**
```typescript
import { fetchBlogPostBySlug } from '@/data/blogPosts'

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await fetchBlogPostBySlug(params.slug)
  
  if (!post) {
    return <div>Post not found</div>
  }
  
  // ... rest of component
```

---

## ⚠️ Important Notes

### Client vs Server Components

**Server Components (Recommended):**
- Remove `'use client'` directive
- Use `async` functions
- Fetch data directly with `await`
- Better performance (no client-side fetching)

**Client Components:**
- Keep `'use client'` directive if using hooks or interactivity
- Use `useEffect` + `useState` for data fetching
- Add loading states
- Handle errors

### Example: Converting to Server Component

**Before (Client Component):**
```typescript
'use client'

import { projects } from '@/data/projects'

export default function Projects() {
  return (
    <div>
      {projects.map(project => (
        <div key={project.project}>{project.title}</div>
      ))}
    </div>
  )
}
```

**After (Server Component):**
```typescript
// Remove 'use client'
import { fetchProjects } from '@/data/projects'

export default async function Projects() {
  const projects = await fetchProjects()
  
  return (
    <div>
      {projects.map(project => (
        <div key={project.project}>{project.title}</div>
      ))}
    </div>
  )
}
```

---

## 🚀 Quick Migration Strategy

### Strategy 1: All Server Components (Recommended)
1. Remove `'use client'` from all data-fetching components
2. Make them `async` functions
3. Use `await` to fetch data
4. Deploy and test

**Pros:** Better performance, simpler code  
**Cons:** May need to split components if they have interactivity

### Strategy 2: Keep Client Components
1. Keep `'use client'` directive
2. Import `useState` and `useEffect`
3. Fetch data in `useEffect`
4. Add loading states

**Pros:** Works with existing interactive components  
**Cons:** More complex, client-side data fetching

### Strategy 3: Hybrid Approach
1. Server components for data fetching
2. Separate client components for interactivity
3. Pass data as props

**Pros:** Best of both worlds  
**Cons:** Requires component restructuring

---

## 🧪 Testing Your Updates

After making changes:

1. **Start dev server:**
   ```bash
   npm run dev
   ```

2. **Check each page:**
   - http://localhost:3000/ (Home - with Projects & Blog components)
   - http://localhost:3000/projects (All Projects)
   - http://localhost:3000/blog (All Blog Posts)
   - http://localhost:3000/resume (Experience & Skills)

3. **Look for errors in:**
   - Terminal output
   - Browser console
   - Network tab (API calls)

4. **Verify:**
   - Images load from Supabase
   - All data displays correctly
   - No console errors

---

## 🔧 Temporary Fallback (For Testing)

If you want to test without updating all components immediately, you can use the local fallback data:

```typescript
// Instead of:
import { fetchProjects } from '@/data/projects'

// Use:
import { projectsLocal as projects } from '@/data/projects'

// Then use as before:
// {projects.map(...)}
```

This lets you test incrementally, but remember to switch to `fetch*` functions before deploying to use Supabase data.

---

## ✅ Checklist

Before deploying:

- [ ] Updated all imports to use `fetch*` functions
- [ ] Made components `async` (or added `useEffect` for client components)
- [ ] Tested locally with dev server
- [ ] Verified images load from Supabase
- [ ] Checked console for errors
- [ ] Added loading states (if using client components)
- [ ] Handled error cases
- [ ] Tested all pages: Home, Projects, Blog, Resume
- [ ] Verified environment variables in `.env.local`
- [ ] Added environment variables to Cloudflare Pages

---

## 🆘 Need Help?

**Common Error: "projects is not defined"**
- **Cause:** Forgot to fetch data with `await fetchProjects()`
- **Fix:** Add `const projects = await fetchProjects()` at top of component

**Common Error: "Cannot use 'await' outside async function"**
- **Cause:** Component is not marked as `async`
- **Fix:** Change `export default function` to `export default async function`

**Common Error: "Component is marked as client but uses async"**
- **Cause:** Can't have both `'use client'` and `async` in same component
- **Fix:** Either remove `'use client'` OR use `useEffect` pattern instead

---

Want to see a full working example? Check the `SUPABASE_QUICKSTART.md` file for code examples!

