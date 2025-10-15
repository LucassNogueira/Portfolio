# Supabase Quick Start

A quick reference for getting your portfolio up and running with Supabase.

## 🚀 Quick Setup (5 minutes)

### 1. Create Supabase Project
- Go to [supabase.com](https://supabase.com)
- Create new project (Free tier is perfect!)
- Note your URL and anon key

### 2. Add Environment Variables
Create `.env.local`:
```bash
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 3. Run Database Migration
1. Open Supabase Dashboard → SQL Editor
2. Copy contents from `supabase/migrations/001_initial_schema.sql`
3. Paste and Run

### 4. Upload Data
```bash
npm run migrate:supabase
```

### 5. Start Development
```bash
npm run dev
```

That's it! 🎉

---

## 📁 What Was Created

### New Files
- `src/lib/supabase.ts` - Supabase client configuration
- `src/lib/supabase-api.ts` - API utility functions
- `scripts/migrate-to-supabase.ts` - One-time migration script
- `supabase/migrations/001_initial_schema.sql` - Database schema
- `.env.local.example` - Environment variables template

### Updated Files
- `src/data/projects.ts` - Now exports `fetchProjects()`
- `src/data/blogPosts.ts` - Now exports `fetchBlogPosts()`
- `src/data/skills.ts` - Now exports `fetchSkills()`
- `src/data/experience.ts` - Now exports `fetchExperiences()`
- `package.json` - Added `migrate:supabase` script

---

## 🎯 What You Need to Update

Since your data files now export **async functions** instead of **static arrays**, you'll need to update your pages/components to handle the async data fetching.

### Before (Old - Static Data):
```typescript
import { projects } from '@/data/projects'

export default function ProjectsPage() {
  return <div>{projects.map(...)}</div>
}
```

### After (New - Supabase Data):

#### Option 1: Server Component (Recommended for Next.js 15)
```typescript
import { fetchProjects } from '@/data/projects'

export default async function ProjectsPage() {
  const projects = await fetchProjects()
  return <div>{projects.map(...)}</div>
}
```

#### Option 2: Client Component with useEffect
```typescript
'use client'
import { useState, useEffect } from 'react'
import { fetchProjects } from '@/data/projects'

export default function ProjectsPage() {
  const [projects, setProjects] = useState([])
  
  useEffect(() => {
    fetchProjects().then(setProjects)
  }, [])
  
  return <div>{projects.map(...)}</div>
}
```

#### Option 3: Use Fallback Data (For Testing)
```typescript
import { projectsLocal } from '@/data/projects'

// Use local data while testing
export default function ProjectsPage() {
  return <div>{projectsLocal.map(...)}</div>
}
```

---

## 📝 Data Management

### Add New Project
```typescript
import { supabase } from '@/lib/supabase'

// 1. Upload image to Storage first
const { data, error } = await supabase.storage
  .from('portfolio-images')
  .upload('images/my-project.png', file)

// 2. Add to database
await supabase.from('projects').insert({
  project_number: 6,
  title: "My Project",
  image_path: "images/my-project.png",
  creation: "Description",
  tech: "Tech stack",
  hosted_url: "https://...",
  github_url: "https://..."
})
```

### Add New Blog Post
```typescript
await supabase.from('blog_posts').insert({
  title: "My Post",
  excerpt: "Brief description",
  category: "React",
  date: "Jan 1 2025",
  read_time: "5 min read",
  slug: "my-post"
})
```

---

## 🔍 Common Issues

| Issue                           | Solution                       |
| ------------------------------- | ------------------------------ |
| "Missing environment variables" | Create `.env.local` file       |
| "Failed to fetch"               | Run SQL migration first        |
| Images not showing              | Check Storage bucket is public |
| Component errors                | Update to async/await pattern  |

---

## 💰 Free Tier Limits

✅ **500 MB Database** - Plenty for portfolio  
✅ **1 GB Storage** - ~100 high-quality images  
✅ **Unlimited API Requests** - No worries!  
✅ **2 GB Bandwidth/month** - Good for personal sites  

---

## 📚 Full Documentation

See [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) for detailed step-by-step instructions.

---

## 🆘 Need Help?

1. Check Supabase dashboard's **Table Editor** to verify data
2. Check **Storage** to verify images uploaded
3. Check browser console for error messages
4. Verify `.env.local` has correct credentials

