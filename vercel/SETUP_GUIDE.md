# Quick Setup Steps - Vercel Backend Migration

All the code has been updated! Now follow these steps to complete the migration using the Vercel Dashboard:

## Step 1: Create Vercel Postgres Database

1. Go to your Vercel Dashboard: https://vercel.com/dashboard
2. Select your Portfolio project
3. Go to the **Storage** tab
4. Click **Create Database**
5. Select **Postgres**
6. Choose a name (e.g., `portfolio-db`)
7. Select a region close to your users
8. Click **Create**

## Step 2: Enable Vercel Blob Storage

1. In the same **Storage** tab
2. Click **Create Database** again
3. Select **Blob**
4. Choose a name (e.g., `portfolio-images`)
5. Click **Create**

## Step 3: Pull Environment Variables Locally

Run this command to download environment variables to your local machine:

```bash
vercel env pull .env.local
```

This will automatically add:
- `POSTGRES_URL` and related Postgres variables
- `BLOB_READ_WRITE_TOKEN` and related Blob variables

## Step 4: Set Blob URL Prefix

After creating Blob storage, you need to set the public URL prefix:

1. In Vercel Dashboard > Storage > Blob, find your Blob store URL
2. It should look like: `https://xxxxxx.public.blob.vercel-storage.com`
3. Add this as an environment variable:

```bash
vercel env add NEXT_PUBLIC_BLOB_URL_PREFIX production
```

When prompted, paste the URL (without trailing slash).

Then pull it locally:

```bash
vercel env pull .env.local
```

## Step 5: Create Database Schema

You have two options:

### Option A: Using Vercel Dashboard (Recommended)
1. Go to Vercel Dashboard > Storage > Your Postgres Database
2. Click on the **Query** tab or **.sql Editor**
3. Copy the contents of `vercel/schema.sql` and paste it there
4. Click **Run** or **Execute**

### Option B: Using CLI
```bash
# Extract POSTGRES_URL from .env.local and connect
psql "$(grep POSTGRES_URL .env.local | cut -d '=' -f2- | tr -d \"'\")" < vercel/schema.sql
```

## Step 6: Migrate Data from Supabase

Run the data migration script:

```bash
npm run migrate:vercel:data
```

This transfers all data (projects, blog posts, skills, experiences) from Supabase to Vercel Postgres.

## Step 7: Migrate Images to Vercel Blob

Run the image migration script:

```bash
npm run migrate:vercel:images
```

This downloads images from Supabase and uploads them to Vercel Blob.

## Step 8: Test Locally

```bash
npm run dev
```

Visit http://localhost:3000 and verify everything works.

## Step 9: Deploy

```bash
npm run build
vercel --prod
```

## Clean Up (After Verification)

Once everything is working in production:

```bash
# Remove Supabase dependency
npm uninstall @supabase/supabase-js

# Remove old files
rm -rf supabase/
rm src/lib/supabase.ts
rm src/lib/supabase-api.ts
```

Then remove Supabase environment variables from:
- `.env.local` (locally)
- Vercel Dashboard > Settings > Environment Variables

---

## Troubleshooting

**Database connection failed**
- Make sure you ran `vercel env pull .env.local`
- Check `.env.local` has `POSTGRES_URL`

**Images not loading**
- Verify `NEXT_PUBLIC_BLOB_URL_PREFIX` is set
- Check images uploaded: Vercel Dashboard > Storage > Blob
- Make sure Blob access is "public"

**Migration script errors**
- Ensure Supabase credentials in `.env.local` are still valid
- Verify Vercel environment variables are loaded
