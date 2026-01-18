# Vercel Deployment Guide

This guide will help you deploy The Perspective application on Vercel.

## Prerequisites

- GitHub account
- Vercel account ([sign up](https://vercel.com))
- Supabase project set up (see [SUPABASE_SETUP.md](./SUPABASE_SETUP.md))

## Deployment Options

### Option 1: Deploy Both Frontend and Backend on Vercel (Recommended)

This approach deploys everything on Vercel using serverless functions.

#### Step 1: Push to GitHub

1. Initialize git repository (if not already done):
```bash
git init
git add .
git commit -m "Initial commit"
```

2. Create a new repository on GitHub

3. Push your code:
```bash
git remote add origin https://github.com/YOUR_USERNAME/ThePerspective.git
git branch -M main
git push -u origin main
```

#### Step 2: Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **"Add New Project"**
3. Import your GitHub repository
4. Configure the project:

   **Project Settings:**
   - **Framework Preset**: Next.js
   - **Root Directory**: `frontend`
   - **Build Command**: `cd .. && npm run install:all && cd frontend && npm run build`
   - **Output Directory**: `.next`
   - **Install Command**: `cd .. && npm run install:all`

   **Environment Variables:**
   Add these in Vercel dashboard → Settings → Environment Variables:

   **For Frontend:**
   ```
   NEXT_PUBLIC_API_URL=https://your-project.vercel.app/api
   ```

   **For Backend (API):**
   ```
   DATABASE_URL=your-supabase-connection-string
   JWT_SECRET=your-jwt-secret
   NODE_ENV=production
   FRONTEND_URL=https://your-project.vercel.app
   ```

5. Click **"Deploy"**

#### Step 3: Update API URL

After deployment, update the `NEXT_PUBLIC_API_URL` environment variable in Vercel:
1. Go to your project → Settings → Environment Variables
2. Update `NEXT_PUBLIC_API_URL` to your Vercel deployment URL
3. Redeploy

### Option 2: Frontend on Vercel, Backend on Railway/Render

This approach separates frontend and backend deployments.

#### Deploy Frontend on Vercel

1. Follow Step 1 above (push to GitHub)
2. Deploy on Vercel:
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
   - **Environment Variable**: `NEXT_PUBLIC_API_URL=https://your-backend-url.com/api`

#### Deploy Backend on Railway/Render

**Railway:**
1. Go to [railway.app](https://railway.app)
2. New Project → Deploy from GitHub
3. Select your repository
4. Set root directory to `backend`
5. Add environment variables
6. Deploy

**Render:**
1. Go to [render.com](https://render.com)
2. New → Web Service
3. Connect GitHub repository
4. Set:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install && npx prisma generate`
   - **Start Command**: `npm start`
5. Add environment variables
6. Deploy

## Environment Variables

### Frontend (Vercel)

| Variable | Value | Required |
|----------|-------|----------|
| `NEXT_PUBLIC_API_URL` | Your backend API URL | Yes |

### Backend (Vercel/Railway/Render)

| Variable | Value | Required |
|----------|-------|----------|
| `DATABASE_URL` | Supabase connection string | Yes |
| `JWT_SECRET` | Random secret (32+ chars) | Yes |
| `NODE_ENV` | `production` | Yes |
| `FRONTEND_URL` | Your frontend URL | Yes |
| `PORT` | Auto-set by platform | No |
| `EMAIL_HOST` | SMTP server (optional) | No |
| `EMAIL_PORT` | SMTP port (optional) | No |
| `EMAIL_USER` | Email username (optional) | No |
| `EMAIL_PASS` | Email password (optional) | No |

## Post-Deployment Steps

### 1. Generate Prisma Client

After deployment, you may need to generate Prisma client. Add this to your build command:

```bash
cd backend && npx prisma generate && cd ../frontend && npm run build
```

### 2. Run Database Migrations

If you haven't already:
1. Run `supabase/schema.sql` in Supabase SQL Editor
2. Or run migrations: `npx prisma migrate deploy` (in backend directory)

### 3. Verify Deployment

- Frontend: Visit your Vercel URL
- Backend API: Visit `https://your-project.vercel.app/api/health`
- Test endpoints: `/api/articles`, `/api/categories`, etc.

## Troubleshooting

### Build Fails

**Error: "Cannot find module"**
- Ensure `installCommand` includes installing all dependencies
- Check that `package.json` files are in correct locations

**Error: "Prisma Client not generated"**
- Add `npx prisma generate` to build command
- Ensure `DATABASE_URL` is set correctly

### API Routes Not Working

**Error: "Route not found"**
- Check `vercel.json` routing configuration
- Verify API routes are in `backend/api/` directory
- Ensure routes start with `/api/`

### Database Connection Issues

**Error: "Can't reach database server"**
- Verify `DATABASE_URL` is correct in Vercel environment variables
- Check Supabase project is active
- Use connection pooling URL for production

### CORS Issues

**Error: "CORS policy blocked"**
- Update `FRONTEND_URL` in backend environment variables
- Check CORS configuration in `backend/api/index.js`

## Custom Domain

1. Go to Vercel project → Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed
4. Update `FRONTEND_URL` and `NEXT_PUBLIC_API_URL` if needed

## Continuous Deployment

Vercel automatically deploys on every push to your main branch. To disable:
1. Go to Settings → Git
2. Configure deployment settings

## Monitoring

- **Vercel Dashboard**: View deployments, logs, and analytics
- **Function Logs**: Check serverless function logs in Vercel dashboard
- **Supabase Dashboard**: Monitor database queries and performance

## Production Checklist

- [ ] Environment variables set in Vercel
- [ ] Database schema created in Supabase
- [ ] Prisma client generated
- [ ] Frontend builds successfully
- [ ] API routes working
- [ ] CORS configured correctly
- [ ] Custom domain configured (optional)
- [ ] SSL certificate active (automatic with Vercel)

## Support

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Prisma Deployment](https://www.prisma.io/docs/guides/deployment)
