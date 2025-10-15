# Cloudflare Pages Deployment Guide

## Setup Complete ✅

Your portfolio is now configured for Cloudflare Pages deployment using the `@cloudflare/next-on-pages` adapter.

## Deployment Options

### Option 1: Via Cloudflare Pages Dashboard (Recommended)

If you're deploying through the Cloudflare Pages dashboard with Git integration:

1. Go to your Cloudflare Pages project settings
2. Update the build configuration:
   - **Build command**: `npm run pages:build`
   - **Build output directory**: `.vercel/output/static`
   - **Node version**: `22` or `20`

3. Push your changes to your Git repository
4. Cloudflare Pages will automatically build and deploy

### Option 2: Via CLI

To deploy from your local machine:

```bash
# Install dependencies (if you haven't already)
npm install

# Build and deploy
npm run deploy
```

Or deploy manually:
```bash
# Build the application
npm run pages:build

# Deploy to Cloudflare Pages
npx wrangler pages deploy .vercel/output/static
```

## Local Development

To test your app with Cloudflare's environment locally:

```bash
# Preview with Cloudflare Workers runtime
npm run preview
```

For regular Next.js development:
```bash
npm run dev
```

## What Changed?

1. **Added dependencies**:
   - `@cloudflare/next-on-pages` - Adapter for Next.js on Cloudflare Pages
   - `wrangler` - Cloudflare's CLI tool

2. **Updated `next.config.js`**:
   - Added `unoptimized: true` for images (Cloudflare Pages doesn't support Next.js Image Optimization)

3. **Created `wrangler.toml`**:
   - Configuration file for Wrangler deployment

4. **Added new npm scripts**:
   - `pages:build` - Builds the app for Cloudflare Pages
   - `preview` - Locally preview with Cloudflare Workers runtime
   - `deploy` - Build and deploy to Cloudflare Pages

## Important Notes

- Next.js Image Optimization is disabled (`unoptimized: true`) because Cloudflare Pages doesn't support it
- The build output goes to `.vercel/output/static` (this is the standard output location for the adapter)
- Make sure to run `npm install` before deploying to install the new dependencies

## Troubleshooting

If you encounter issues:

1. Make sure you've run `npm install` to install the new dependencies
2. Check that your Cloudflare Pages build settings match the ones above
3. Verify your Node.js version is 20 or higher
4. Check the Cloudflare Pages build logs for specific errors

## Resources

- [Next.js on Cloudflare Pages Documentation](https://developers.cloudflare.com/pages/framework-guides/nextjs/)
- [@cloudflare/next-on-pages GitHub](https://github.com/cloudflare/next-on-pages)
- [Wrangler Documentation](https://developers.cloudflare.com/workers/wrangler/)

