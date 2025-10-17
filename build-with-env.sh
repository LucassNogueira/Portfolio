#!/bin/bash

# Build script that ensures environment variables are available during build
# This is needed because @cloudflare/next-on-pages uses vercel build
# which doesn't automatically pick up Cloudflare environment variables

echo "🔧 Starting Cloudflare Pages build with environment variables..."

# Export Cloudflare environment variables for the build process
# These will be picked up by Next.js during the build
export NEXT_PUBLIC_SUPABASE_URL="${NEXT_PUBLIC_SUPABASE_URL}"
export NEXT_PUBLIC_SUPABASE_ANON_KEY="${NEXT_PUBLIC_SUPABASE_ANON_KEY}"

# Verify environment variables are set
if [ -z "$NEXT_PUBLIC_SUPABASE_URL" ]; then
  echo "⚠️  WARNING: NEXT_PUBLIC_SUPABASE_URL is not set"
else
  echo "✅ NEXT_PUBLIC_SUPABASE_URL is set"
fi

if [ -z "$NEXT_PUBLIC_SUPABASE_ANON_KEY" ]; then
  echo "⚠️  WARNING: NEXT_PUBLIC_SUPABASE_ANON_KEY is not set"
else
  echo "✅ NEXT_PUBLIC_SUPABASE_ANON_KEY is set"
fi

# Run the build
echo "🚀 Running @cloudflare/next-on-pages build..."
npx @cloudflare/next-on-pages

echo "✨ Build complete!"

