# Cloudflare Pages Environment Variables Setup

## 🎯 The Problem

When using `@cloudflare/next-on-pages`, environment variables prefixed with `NEXT_PUBLIC_` must be available **during the build process** (not just at runtime) because Next.js bakes them into the client-side JavaScript bundle.

## ✅ Solution

### Step 1: Set Environment Variables in Cloudflare Dashboard

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Navigate to **Pages** → Your portfolio project
3. Click **Settings** → **Environment variables**
4. Add the following variables for **Production**:

   **Variable 1:**
   - Name: `NEXT_PUBLIC_SUPABASE_URL`
   - Value: `https://efudukihcpqvppfpaorf.supabase.co`
   - Environment: **Production**

   **Variable 2:**
   - Name: `NEXT_PUBLIC_SUPABASE_ANON_KEY`  
   - Value: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVmdWR1a2loY3BxdnBwZnBhb3JmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA0OTAzMzksImV4cCI6MjA3NjA2NjMzOX0.6wNycsY2wU7six11pz_FlO6LCVOL0F16OjULoxfbH4g`
   - Environment: **Production**

5. **IMPORTANT:** Also add them to **Preview** environment if you want them to work in preview deployments

### Step 2: Verify Build Settings

In Cloudflare Pages **Settings** → **Builds and deployments**:

- **Build command:** `npm run pages:build`
- **Build output directory:** `.vercel/output/static`
- **Root directory:** (leave empty)
- **Node version:** `20` or `22`

### Step 3: Trigger a New Deployment

After setting the environment variables, you MUST trigger a new deployment:

**Option A: Push a commit**
```bash
git commit --allow-empty -m "Trigger rebuild with env vars"
git push
```

**Option B: Retry deployment**
- Go to **Deployments** tab
- Click **Retry deployment** on the latest deployment

## 🔍 Debugging

Once deployed, visit your site and check if the debug panel shows up in the bottom-right corner. It will display:

- Client-side environment variable status
- Server-side environment variable status  
- Supabase connection test button

### What You Should See

**✅ Success:**
```json
{
  "supabaseUrlExists": true,
  "supabaseKeyExists": true,
  "supabaseUrl": "https://efudukihcpqvppfpaorf...",
  "supabaseKeyLength": 215
}
```

**❌ Problem:**
```json
{
  "supabaseUrlExists": false,
  "supabaseKeyExists": false,
  "supabaseUrl": "MISSING",
  "supabaseKeyLength": 0
}
```

## 🐛 Common Issues

### Issue 1: "Variables not found after adding them"
**Solution:** You must trigger a NEW deployment after adding environment variables. Simply adding them doesn't rebuild your site.

### Issue 2: "Works locally but not in production"
**Solution:** Make sure variables are set for the **Production** environment (not just Preview) and that you've triggered a new deployment.

### Issue 3: "Build fails with 'edge runtime' error"
**Solution:** All dynamic routes in `@cloudflare/next-on-pages` must have `export const runtime = 'edge'`. This is already configured in your app.

## 📝 Removing Debug Panel (After Fixed)

Once everything works, remove the debug panel:

1. Edit `src/app/page.tsx`
2. Remove the line: `<DebugPanel />`
3. Remove the import: `import DebugPanel from '@/components/DebugPanel'`
4. Delete `src/components/DebugPanel.tsx`
5. Delete `src/app/api/debug-env/route.ts`

## 🎉 Expected Behavior After Fix

- ✅ Skills section shows all your skills grouped by category
- ✅ Writing/Blog section shows your blog posts  
- ✅ All data is loaded from Supabase
- ✅ No console errors related to Supabase

## 📚 Additional Resources

- [Cloudflare Pages Environment Variables](https://developers.cloudflare.com/pages/configuration/build-configuration/#environment-variables)
- [@cloudflare/next-on-pages Documentation](https://github.com/cloudflare/next-on-pages)
- [Next.js Environment Variables](https://nextjs.org/docs/app/building-your-application/configuring/environment-variables)

