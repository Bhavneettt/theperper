# Quick Vercel Deployment Guide

## Step-by-Step Deployment

### 1. Push Your Code to GitHub

```bash
# Initialize git (if not already done)
git init
git add .
git commit -m "Ready for deployment"

# Create repository on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/ThePerspective.git
git branch -M main
git push -u origin main
```

### 2. Deploy Frontend on Vercel

1. **Go to [vercel.com](https://vercel.com)** and sign in
2. Click **"Add New Project"**
3. **Import your GitHub repository**
4. **Configure Project:**
   - **Framework Preset**: Next.js
   - **Root Directory**: `frontend` (click "Edit" and set to `frontend`)
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `.next` (auto-detected)
   - **Install Command**: `npm install` (auto-detected)

5. **Add Environment Variables:**
   Click "Environment Variables" and add:
   ```
   NEXT_PUBLIC_API_URL=https://your-backend-url.vercel.app/api
   ```
   (You'll update this after backend deployment)

6. Click **"Deploy"**

### 3. Deploy Backend on Vercel (Separate Project)

1. **Create a new Vercel project** (same account)
2. **Import the same GitHub repository**
3. **Configure Project:**
   - **Framework Preset**: Other
   - **Root Directory**: `backend` (click "Edit" and set to `backend`)
   - **Build Command**: `npm install && npx prisma generate`
   - **Output Directory**: Leave empty
   - **Install Command**: `npm install`

4. **Add Environment Variables:**
   ```
   DATABASE_URL=your-supabase-connection-string
   JWT_SECRET=your-jwt-secret-key
   NODE_ENV=production
   FRONTEND_URL=https://your-frontend-url.vercel.app
   ```

5. **Update vercel.json routing:**
   The backend uses `backend/api/index.js` as the entry point

6. Click **"Deploy"**

### 4. Update Frontend API URL

1. Go to your **frontend project** on Vercel
2. **Settings** → **Environment Variables**
3. Update `NEXT_PUBLIC_API_URL` to your backend URL:
   ```
   NEXT_PUBLIC_API_URL=https://your-backend-project.vercel.app/api
   ```
4. **Redeploy** the frontend

## Alternative: Deploy Backend on Railway/Render

If you prefer a traditional server setup:

### Railway
1. Go to [railway.app](https://railway.app)
2. New Project → Deploy from GitHub
3. Select repository, set root to `backend`
4. Add environment variables
5. Deploy

### Render
1. Go to [render.com](https://render.com)
2. New → Web Service
3. Connect GitHub, set root to `backend`
4. Build: `npm install && npx prisma generate`
5. Start: `npm start`
6. Add environment variables
7. Deploy

## Environment Variables Checklist

### Frontend (Vercel)
- ✅ `NEXT_PUBLIC_API_URL` - Backend API URL

### Backend (Vercel/Railway/Render)
- ✅ `DATABASE_URL` - Supabase connection string
- ✅ `JWT_SECRET` - Random secret (32+ chars)
- ✅ `NODE_ENV` - `production`
- ✅ `FRONTEND_URL` - Frontend URL for CORS

## Verify Deployment

1. **Frontend**: Visit `https://your-frontend.vercel.app`
2. **Backend Health**: `https://your-backend.vercel.app/api/health`
3. **Test API**: `https://your-backend.vercel.app/api/articles`

## Troubleshooting

**Build fails?**
- Check build logs in Vercel dashboard
- Ensure all dependencies are in `package.json`
- Verify Prisma client is generated

**API not working?**
- Check backend environment variables
- Verify `DATABASE_URL` is correct
- Check function logs in Vercel dashboard

**CORS errors?**
- Update `FRONTEND_URL` in backend env vars
- Ensure frontend URL matches exactly

## Need Help?

See [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md) for detailed instructions.
