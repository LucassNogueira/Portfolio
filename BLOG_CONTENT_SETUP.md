# Blog Content Migration Guide

This guide will help you add markdown content to your blog posts in Supabase.

## What Was Changed

1. ✅ Added `content` column to the `blog_posts` table schema
2. ✅ Updated TypeScript types to include optional `content` field
3. ✅ Updated Supabase API to fetch content
4. ✅ Updated blog page to display content from Supabase
5. ✅ Created migration script to read markdown files and upload content

## Steps to Complete

### 1. Run the SQL Migration

Go to your Supabase Dashboard:
1. Open **SQL Editor**
2. Copy and paste the contents of: `supabase/migrations/002_add_blog_content.sql`
3. Click **Run**

This will add the `content` column to your `blog_posts` table.

### 2. Update Existing Blog Posts with Content

Run this command in your terminal:

```bash
npm run update:blog-content
```

This will:
- Read the markdown files from `src/content/blog/`
- Update each blog post in Supabase with its content
- Show you a summary of what was updated

### 3. Verify in Supabase

Go to **Table Editor** → **blog_posts** and check that your posts now have content.

### 4. Test Locally

```bash
npm run dev
```

Visit a blog post (e.g., `/blog/nuqs-modal-state-hooks`) and you should see the full markdown content rendered.

### 5. Deploy

Once everything looks good:

```bash
git add -A
git commit -m "Add blog content to Supabase"
git push
```

## Expected Output

When you run `npm run update:blog-content`, you should see:

```
📝 Updating blog posts with markdown content...

Found 3 blog posts

✅ Updated "nuqs + React Hooks: Managing Modal State Without Losing Your Mind" with content (6234 characters)
✅ Updated "Building Features Before the Backend Exists (makeMockApiCall)" with content (10987 characters)
✅ Updated "Toast Notifications: Just Call It From Anywhere" with content (15234 characters)

📊 Summary:
   ✅ Updated: 3
   ⏭️  Skipped: 0
   ❌ Errors: 0

✨ Blog content updated successfully!
```

## Troubleshooting

**Error: "Missing Supabase environment variables"**
- Make sure your `.env.local` file has `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`

**Error: "markdown file not found"**
- Check that your markdown files are in `src/content/blog/` with the correct slug names

**Empty content on blog page**
- Verify the SQL migration ran successfully
- Check that the update script completed without errors
- Refresh your browser cache

## What Happens in Production

- Your blog pages use Edge Runtime (Cloudflare compatible)
- Content is fetched from Supabase at runtime
- No filesystem operations needed
- Fast, cached responses

