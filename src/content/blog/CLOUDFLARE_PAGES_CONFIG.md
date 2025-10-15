# Cloudflare Pages Configuration

## Required Settings in Cloudflare Dashboard

Go to: **Cloudflare Dashboard → Pages → Your Project → Settings → Build & deployments**

### Build Configuration:

```
Framework preset:       Next.js
Build command:          npm run pages:build
Build output directory: .vercel/output/static
Root directory:         (leave empty or /)
```

### Important:
- **Deploy command**: If the field won't accept empty, use: `echo "Deployed by Cloudflare Pages"`
  - Cloudflare Pages automatically deploys the build output
  - The deploy command is not needed for Pages (only for Workers)
- Node version will be auto-detected (22.16.0)

### Environment Variables:
If you have any (like `RESEND_API_KEY`):
- Go to Settings → Environment variables
- Add them there

## After Updating Settings:
1. Save the configuration
2. Go to "Deployments" tab
3. Click "Retry deployment" on the latest failed deployment
   OR push a new commit to trigger a fresh deployment

## Build Process:
The `npm run pages:build` command will:
1. Run `next build` internally
2. Convert Next.js output to Cloudflare Pages format
3. Create `.vercel/output/static` directory with:
   - Static pages
   - Edge functions (like /api/contact)
   - All assets

## Verification:
Once deployed successfully, you should see:
- ✅ 12 Static pages
- ✅ 1 Edge function route (/api/contact)
- ✅ ~75 static assets

## Troubleshooting:
If build fails:
1. Check that build command is exactly: `npm run pages:build`
2. Verify output directory is: `.vercel/output/static`
3. Ensure deploy command is EMPTY (not `wrangler deploy`)
4. Check build logs for specific errors
