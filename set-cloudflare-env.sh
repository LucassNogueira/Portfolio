#!/bin/bash

# Cloudflare Pages Environment Variables Setup Script
# This script helps you set environment variables for your Cloudflare Pages project

echo "🔧 Cloudflare Pages Environment Variables Setup"
echo "================================================"
echo ""

# Get project name
echo "What is your Cloudflare Pages project name?"
echo "(You can find this in the Cloudflare dashboard under Pages)"
read -p "Project name: " PROJECT_NAME

# Get account ID (we already know it, but asking for confirmation)
ACCOUNT_ID="d2e3dd9515986da40479d1c3b4b0454c"
echo ""
echo "Using Account ID: $ACCOUNT_ID"
echo ""

# Read environment variables from .env.local
if [ ! -f .env.local ]; then
    echo "❌ Error: .env.local file not found"
    exit 1
fi

SUPABASE_URL=$(grep NEXT_PUBLIC_SUPABASE_URL .env.local | cut -d '=' -f2)
SUPABASE_KEY=$(grep NEXT_PUBLIC_SUPABASE_ANON_KEY .env.local | cut -d '=' -f2)

echo "Environment variables to be set:"
echo "  NEXT_PUBLIC_SUPABASE_URL=$SUPABASE_URL"
echo "  NEXT_PUBLIC_SUPABASE_ANON_KEY=$SUPABASE_KEY"
echo ""

# Get API Token
echo "To proceed, you need a Cloudflare API Token with 'Cloudflare Pages' edit permissions."
echo "Create one at: https://dash.cloudflare.com/profile/api-tokens"
echo ""
read -sp "Enter your Cloudflare API Token: " API_TOKEN
echo ""
echo ""

# Set environment variables via API
echo "📤 Setting environment variables..."
echo ""

# Prepare JSON payload
JSON_PAYLOAD=$(cat <<EOF
{
  "deployment_configs": {
    "production": {
      "env_vars": {
        "NEXT_PUBLIC_SUPABASE_URL": {
          "type": "plain_text",
          "value": "$SUPABASE_URL"
        },
        "NEXT_PUBLIC_SUPABASE_ANON_KEY": {
          "type": "plain_text",
          "value": "$SUPABASE_KEY"
        }
      }
    },
    "preview": {
      "env_vars": {
        "NEXT_PUBLIC_SUPABASE_URL": {
          "type": "plain_text",
          "value": "$SUPABASE_URL"
        },
        "NEXT_PUBLIC_SUPABASE_ANON_KEY": {
          "type": "plain_text",
          "value": "$SUPABASE_KEY"
        }
      }
    }
  }
}
EOF
)

# Make API request
RESPONSE=$(curl -s -X PATCH \
  "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/pages/projects/$PROJECT_NAME" \
  -H "Authorization: Bearer $API_TOKEN" \
  -H "Content-Type: application/json" \
  -d "$JSON_PAYLOAD")

# Check if successful
if echo "$RESPONSE" | grep -q '"success":true'; then
    echo "✅ Environment variables successfully set!"
    echo ""
    echo "🎉 Next steps:"
    echo "  1. Trigger a new deployment to apply the changes"
    echo "  2. Run: npm run deploy"
    echo "  3. Or push a new commit to your Git repository"
else
    echo "❌ Failed to set environment variables"
    echo ""
    echo "Response:"
    echo "$RESPONSE" | python3 -m json.tool 2>/dev/null || echo "$RESPONSE"
    echo ""
    echo "💡 Tip: Make sure your API token has 'Cloudflare Pages - Edit' permissions"
fi

