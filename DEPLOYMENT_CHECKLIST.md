# Vercel Deployment Checklist

## Pre-Deployment

- [ ] Code pushed to GitHub
- [ ] Supabase database set up and schema created
- [ ] Environment variables ready (DATABASE_URL, JWT_SECRET, etc.)
- [ ] Prisma schema updated (if needed)

## Deploy Frontend

1. [ ] Go to [vercel.com](https://vercel.com) and sign in
2. [ ] Click "Add New Project"
3. [ ] Import GitHub repository
4. [ ] Configure:
   - Root Directory: `frontend`
   - Framework: Next.js (auto-detected)
   - Build Command: `npm run build` (auto-detected)
5. [ ] Add Environment Variable:
   - `NEXT_PUBLIC_API_URL` = (will update after backend deploy)
6. [ ] Click "Deploy"
7. [ ] Copy frontend URL: `https://your-project.vercel.app`

## Deploy Backend

1. [ ] Create **new** Vercel project (same account)
2. [ ] Import **same** GitHub repository
3. [ ] Configure:
   - Root Directory: `backend`
   - Framework: Other
   - Build Command: `npm install && npx prisma generate`
   - Output Directory: (leave empty)
4. [ ] Add Environment Variables:
   - `DATABASE_URL` = your Supabase connection string
   - `JWT_SECRET` = your secret key
   - `NODE_ENV` = `production`
   - `FRONTEND_URL` = your frontend URL from step above
5. [ ] Click "Deploy"
6. [ ] Copy backend URL: `https://your-backend-project.vercel.app`

## Update Frontend

1. [ ] Go to frontend project → Settings → Environment Variables
2. [ ] Update `NEXT_PUBLIC_API_URL` = backend URL + `/api`
3. [ ] Redeploy frontend

## Verify

- [ ] Frontend loads: `https://your-frontend.vercel.app`
- [ ] Backend health check: `https://your-backend.vercel.app/api/health`
- [ ] API works: `https://your-backend.vercel.app/api/articles`
- [ ] Frontend can fetch data from backend

## Troubleshooting

- [ ] Check build logs for errors
- [ ] Verify environment variables are set
- [ ] Check function logs in Vercel dashboard
- [ ] Ensure Prisma client is generated (`npx prisma generate`)

## Done! 🎉

Your app should now be live on Vercel!
