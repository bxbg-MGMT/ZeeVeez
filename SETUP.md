# ZeeVeez Setup Guide

## Prerequisites
- Node.js v18+ ([download here](https://nodejs.org/))
- A Resend API key (already in `.env`)
- A Supabase project (already configured)

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

This will start the Vite dev server. The API routes will NOT work locally without additional setup. See "Testing Emails" below.

### 3. Build for Production
```bash
npm run build
```

## Testing Emails Locally

Since this is a Vite frontend app, the API routes need a backend. You have two options:

### Option A: Deploy to Vercel (Recommended)
1. Push code to GitHub
2. Connect to Vercel via GitHub integration
3. Add environment variables from `.env` to Vercel project settings
4. Vercel will automatically run serverless functions in `/api` folder
5. Test on production URL after deployment

### Option B: Run with Vercel CLI Locally
```bash
npm install -g vercel
vercel dev
```

This will start a local server that handles both the frontend and API routes at `localhost:3000`.

### Option C: Manual API Testing
If you just want to test the email function:
```bash
node test-email.js
```

## Environment Variables

Your `.env` file contains:
- `RESEND_API_KEY` - Resend email service API key
- `RESEND_FROM` - Email sender address (z@zeeveez.com)
- `NEXT_PUBLIC_SUPABASE_URL` - Supabase database URL
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` - Supabase public key

**Never commit `.env` to Git!** (Already in `.gitignore`)

## Supabase Setup

Run the SQL from `SUPABASE_SETUP.sql` in your Supabase dashboard:
1. Go to https://app.supabase.com
2. Select your ZeeVeez project
3. Open SQL Editor
4. Create new query and paste `SUPABASE_SETUP.sql` contents
5. Run the query

This creates the `email_signups` table to track submissions.

## Troubleshooting

**Error: `/api/send-email` returns 500**
- Ensure ALL environment variables are set on Vercel (check Project Settings > Environment Variables)
  - Missing `RESEND_API_KEY` is the most common cause
- Verify `RESEND_FROM` is formatted correctly: `Name<email@domain.com>`
- Check Vercel deployment logs for detailed error messages
- Redeploy after adding/updating environment variables
- Check Node.js is installed: `node --version`
- Install dependencies: `npm install`

**Error: CSS or assets return 404**
- Kill dev server and restart: `npm run dev`
- Clear browser cache (Cmd+Shift+Delete)

**Error: Missing `@supabase/supabase-js` error**
- Run `npm install` to install all dependencies

**500 Error with production URL**
- Open browser DevTools Console to see exact error message
- The error is likely one of:
  1. Missing `RESEND_API_KEY` on Vercel
  2. Invalid Resend API key format or expiration
  3. Invalid `RESEND_FROM` email format
  4. Supabase connection issue (non-critical — email still sends)

## Deployment to Vercel

1. Create account at https://vercel.com
2. Import GitHub repo
3. **Add these environment variables from your `.env` file:**
   - `RESEND_API_KEY` — Your Resend API key
   - `RESEND_FROM` — Sender email (e.g., `Howdy<z@zeeveez.com>`)
   - `NEXT_PUBLIC_SUPABASE_URL` — Your Supabase project URL
   - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` — Your Supabase publishable key
4. Deploy!

**Important:** The `NEXT_PUBLIC_*` variables will be visible in frontend code (don't put secrets there). The other variables are kept private on the server.

Emails will send automatically when users submit the form.
