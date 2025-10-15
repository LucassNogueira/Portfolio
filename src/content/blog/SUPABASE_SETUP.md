# Supabase Integration Setup Guide

This guide will walk you through setting up Supabase for your portfolio, including migrating images and data from local files to Supabase.

## 📋 Table of Contents

1. [Create Supabase Account](#1-create-supabase-account)
2. [Create a New Project](#2-create-a-new-project)
3. [Set Up Environment Variables](#3-set-up-environment-variables)
4. [Run Database Migrations](#4-run-database-migrations)
5. [Migrate Your Data](#5-migrate-your-data)
6. [Verify Everything Works](#6-verify-everything-works)
7. [Deploy to Production](#7-deploy-to-production)

---

## 1. Create Supabase Account

1. Go to [https://supabase.com](https://supabase.com)
2. Click "Start your project"
3. Sign up with GitHub (recommended) or email

---

## 2. Create a New Project

1. Once logged in, click "New Project"
2. Fill in the project details:
   - **Name**: `portfolio` (or your preferred name)
   - **Database Password**: Generate a strong password (save it somewhere safe!)
   - **Region**: Choose the closest region to your users
   - **Pricing Plan**: Select "Free" (perfect for portfolios)
3. Click "Create new project"
4. Wait 2-3 minutes for your project to be ready

---

## 3. Set Up Environment Variables

### Get Your Supabase Credentials

1. In your Supabase dashboard, click on **Project Settings** (gear icon in left sidebar)
2. Click on **API** in the left menu
3. You'll see two important values:
   - **Project URL** (looks like: `https://xxxxxxxxxxxxx.supabase.co`)
   - **anon/public key** (a long string starting with `eyJ...`)

### Create Environment File

1. In your project root, create a file called `.env.local`
2. Add your credentials:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project-url.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

> ⚠️ **Important**: The `.env.local` file is already in `.gitignore` and won't be committed to Git. Never commit your Supabase keys to version control!

---

## 4. Run Database Migrations

### Using Supabase SQL Editor

1. Go to your Supabase dashboard
2. Click **SQL Editor** in the left sidebar
3. Click **New query**
4. Open the file `supabase/migrations/001_initial_schema.sql` in your code editor
5. Copy the entire contents
6. Paste it into the SQL Editor
7. Click **Run** (or press Cmd/Ctrl + Enter)
8. You should see a success message

### What This Migration Does

The migration creates 4 tables:
- `projects` - Your portfolio projects
- `blog_posts` - Your blog posts
- `skills` - Your technical skills
- `experiences` - Your work experience

It also:
- Creates indexes for better query performance
- Enables Row Level Security (RLS)
- Sets up public read access policies

---

## 5. Migrate Your Data

Now we'll upload your images to Supabase Storage and populate the database with your existing data.

### Run the Migration Script

In your terminal, run:

```bash
npm run migrate:supabase
```

### What This Script Does

The migration script will:
1. ✅ Create a public storage bucket called `portfolio-images`
2. ✅ Upload all images from `/public/images/` to Supabase Storage
3. ✅ Populate the `projects` table with your 5 projects
4. ✅ Populate the `blog_posts` table with your 3 blog posts
5. ✅ Populate the `skills` table with your skills (Frontend, Backend, Tools)
6. ✅ Populate the `experiences` table with your work history

### Verify in Supabase Dashboard

1. **Check Storage**:
   - Go to **Storage** in left sidebar
   - You should see a bucket called `portfolio-images`
   - Click it to see your uploaded images

2. **Check Database Tables**:
   - Go to **Table Editor** in left sidebar
   - Click on each table (`projects`, `blog_posts`, `skills`, `experiences`)
   - Verify your data is there

---

## 6. Verify Everything Works

### Test Locally

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Your components should now fetch data from Supabase instead of local files

3. Check the browser console for any errors

### Update Your Components (Already Done!)

The following files have been updated to use Supabase:
- ✅ `src/data/projects.ts` - Now exports `fetchProjects()`
- ✅ `src/data/blogPosts.ts` - Now exports `fetchBlogPosts()` and `fetchBlogPostBySlug()`
- ✅ `src/data/skills.ts` - Now exports `fetchSkills()`
- ✅ `src/data/experience.ts` - Now exports `fetchExperiences()`

All files still have fallback local data for development.

---

## 7. Deploy to Production

### Add Environment Variables to Cloudflare Pages

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Navigate to **Pages**
3. Select your portfolio project
4. Go to **Settings** → **Environment variables**
5. Add these variables for **Production** and **Preview**:
   ```
   NEXT_PUBLIC_SUPABASE_URL = your-project-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY = your-anon-key
   ```
6. Save changes

### Deploy

```bash
npm run deploy
```

---

## 🎉 You're Done!

Your portfolio is now fully integrated with Supabase!

## 🔧 Managing Your Data

### Adding New Projects

You can add new projects in two ways:

#### Option 1: Supabase Dashboard (Recommended)
1. Go to **Table Editor** → `projects`
2. Click **Insert** → **Insert row**
3. Fill in the fields
4. Upload the project image to Storage first

#### Option 2: Programmatically
```typescript
import { supabase } from '@/lib/supabase'

await supabase.from('projects').insert({
  project_number: 6,
  title: "My New Project",
  image_path: "images/new-project.png",
  creation: "Description...",
  tech: "React, TypeScript, etc.",
  hosted_url: "https://...",
  github_url: "https://..."
})
```

### Adding New Blog Posts

1. Add the markdown file to `src/data/blogContent/`
2. Add the post metadata to Supabase:
   - Go to **Table Editor** → `blog_posts`
   - Click **Insert** → **Insert row**
   - Fill in all fields

### Updating Images

1. Go to **Storage** → `portfolio-images` → `images`
2. Upload new images
3. Update the `image_path` in your database tables

---

## 🆓 Supabase Free Tier Limits

Your portfolio will easily fit within these limits:

- **Database**: 500 MB (plenty for text data)
- **Storage**: 1 GB (enough for ~100 high-quality images)
- **Bandwidth**: 2 GB/month (sufficient for personal portfolios)
- **API Requests**: Unlimited! 🎉

---

## 🐛 Troubleshooting

### "Missing Supabase environment variables"

**Solution**: Make sure you created `.env.local` with both `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### "Failed to fetch projects"

**Solution**: 
1. Check that you ran the SQL migration
2. Check that you ran the data migration script
3. Verify data exists in Supabase Table Editor

### Images not showing

**Solution**:
1. Verify images exist in Storage → `portfolio-images` → `images`
2. Check that the bucket is set to **public**
3. Verify the `image_path` in your database matches the storage path

### "Cannot read properties of undefined"

**Solution**: Make sure your components are handling the async data fetching properly. Components using Supabase data need to use `async/await` or React Suspense.

---

## 📚 Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Storage Guide](https://supabase.com/docs/guides/storage)
- [Next.js + Supabase Guide](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)

---

## 🔐 Security Notes

1. **Environment Variables**: Never commit `.env.local` to Git
2. **Row Level Security**: Already enabled on all tables
3. **Public Access**: Tables are read-only to the public (perfect for portfolios)
4. **API Keys**: The anon key is safe to expose in your frontend

---

Need help? Check the Supabase dashboard's **API Docs** section for automatically generated API documentation for your project!

