# Email Contact Form Setup

Your contact form is now configured to send emails using Resend!

## Setup Steps:

### 1. Sign up for Resend (Free)
1. Go to [https://resend.com](https://resend.com)
2. Sign up for a free account
3. Navigate to API Keys: [https://resend.com/api-keys](https://resend.com/api-keys)
4. Create a new API key

### 2. Add API Key to Your Project
Create a file called `.env.local` in the root of your project:

```bash
# .env.local
RESEND_API_KEY=re_your_actual_api_key_here
```

**Important:** Make sure `.env.local` is in your `.gitignore` (it should be by default)

### 3. Test It!
1. Restart your dev server: `npm run dev`
2. Go to your contact form
3. Fill it out and submit
4. Check your email at: `Howdy@lucasnogueira.dev`

## How It Works:

- Form submissions go to `/api/contact`
- The API route sends an email via Resend
- You receive the email at `Howdy@lucasnogueira.dev`
- The sender gets a success message

## Upgrading to a Custom Domain (Optional):

Once you add a custom domain to Resend, update this line in `/src/app/api/contact/route.ts`:

```typescript
// Change from:
from: 'Portfolio Contact <onboarding@resend.dev>',

// To:
from: 'Portfolio Contact <contact@yourdomain.com>',
```

## Free Tier Limits:

- 100 emails/day
- 3,000 emails/month
- Perfect for a portfolio site!

## Troubleshooting:

If emails aren't sending, check:
1. Is `RESEND_API_KEY` set in `.env.local`?
2. Did you restart the dev server after adding the env variable?
3. Check the terminal for error messages
4. Verify your API key is active on Resend dashboard

