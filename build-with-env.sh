#!/bin/bash
# Build script with environment variable validation

echo "🔍 Checking build environment variables..."

# Export Cloudflare Pages environment variables if they exist
export NEXT_PUBLIC_CLOUDFLARE=${NEXT_PUBLIC_CLOUDFLARE}

# Export Vercel Postgres URL
export POSTGRES_URL="${POSTGRES_URL}"

# Check Postgres connection
if [ -z "$POSTGRES_URL" ]; then
  echo "⚠️  WARNING: POSTGRES_URL is not set"
  echo "  Database features will be disabled during build"
else
  echo "✅ POSTGRES_URL is set"
fi

# Check Blob storage
if [ -z "$BLOB_READ_WRITE_TOKEN" ] && [ -z "$NEXT_PUBLIC_BLOB_URL_PREFIX" ]; then
  echo "⚠️  WARNING: Blob storage not configured"
  echo "  Image URLs may not work correctly"
else
  echo "✅ Blob storage is configured"
fi

echo ""
echo "🏗️  Starting build..."
npx @cloudflare/next-on-pages

echo "✨ Build complete!"
