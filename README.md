# The Perspective

A digital publication platform that brings together authentic, unfiltered, and human perspectives from industry thought leaders.

## Features

- **Content Management**: Articles, Interviews, Podcasts, Events
- **Search Functionality**: Full-text search across all content types
- **Newsletter Subscription**: Email collection and management
- **Polls & Pulse Check**: Interactive polling system
- **Dark Mode**: Persistent theme switching with system preference detection
- **Responsive Design**: Mobile-first approach
- **Contributor Portal**: For thought leaders to submit content

## Tech Stack

### Frontend
- Next.js 14 (React)
- TypeScript
- Tailwind CSS
- Server-Side Rendering (SSR)

### Backend
- Node.js & Express
- Prisma ORM
- PostgreSQL (via Supabase)
- JWT Authentication

## Prerequisites

- Node.js 18+ ([download](https://nodejs.org/))
- Supabase account (free) - [sign up](https://supabase.com)
- npm or yarn

## Quick Start

### 1. Install Dependencies

```bash
npm run install:all
```

### 2. Set Up Supabase Database

See **[SUPABASE_SETUP.md](./SUPABASE_SETUP.md)** for complete database setup instructions.

Quick steps:
1. Create a Supabase project at [supabase.com](https://supabase.com)
2. Run `supabase/schema.sql` in Supabase SQL Editor
3. Get your connection string from Settings → Database
4. (Optional) Run `supabase/seed.sql` for sample data

### 3. Configure Environment Variables

**Backend** (`backend/.env`):
```env
DATABASE_URL="postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres"
JWT_SECRET="generate-a-random-32-character-string"
PORT=5000
NODE_ENV=development
FRONTEND_URL="http://localhost:3000"
```

**Frontend** (`frontend/.env.local`):
```env
NEXT_PUBLIC_API_URL="http://localhost:5000/api"
```

### 4. Generate Prisma Client

```bash
cd backend
npx prisma generate
```

### 5. Run Development Servers

```bash
npm run dev
```

This starts:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## Project Structure

```
ThePerspective/
├── frontend/          # Next.js React application
│   ├── app/          # Next.js app router pages
│   ├── components/   # React components
│   └── lib/          # Utility functions
├── backend/          # Node.js Express API
│   ├── routes/       # API route handlers
│   ├── prisma/       # Prisma schema and migrations
│   └── server.js     # Express server entry point
└── supabase/         # Database setup files
    ├── schema.sql    # Database schema
    └── seed.sql      # Sample data
```

## API Endpoints

### Articles
- `GET /api/articles` - List articles (paginated, filterable)
- `GET /api/articles/:slug` - Get single article
- `GET /api/articles/featured/latest` - Get featured articles

### Interviews
- `GET /api/interviews` - List interviews
- `GET /api/interviews/:slug` - Get single interview

### Podcasts
- `GET /api/podcasts` - List podcasts
- `GET /api/podcasts/:slug` - Get single podcast

### Events
- `GET /api/events` - List events
- `GET /api/events/:slug` - Get single event

### Newsletter
- `POST /api/newsletter/subscribe` - Subscribe to newsletter
- `POST /api/newsletter/unsubscribe` - Unsubscribe

### Polls
- `GET /api/polls/active` - Get active poll
- `POST /api/polls/:pollId/vote` - Vote on poll

### Search
- `GET /api/search?q=query&type=all` - Search content

## Deployment

### Frontend (Vercel)

1. Connect your GitHub repository to Vercel
2. Set environment variable: `NEXT_PUBLIC_API_URL`
3. Deploy automatically on push

### Backend (Railway/Render/Vercel)

1. Connect your GitHub repository
2. Set environment variables:
   - `DATABASE_URL` - Your Supabase connection string
   - `JWT_SECRET` - Random secret key
   - `PORT` - 5000 (or platform default)
   - `NODE_ENV` - production
   - `FRONTEND_URL` - Your frontend URL
3. Deploy

**Note**: Supabase handles your database - no separate database service needed!

## Environment Variables

### Backend (`backend/.env`)

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | Supabase connection string | Yes |
| `JWT_SECRET` | Random secret for JWT (32+ chars) | Yes |
| `PORT` | Server port | Yes |
| `NODE_ENV` | development or production | Yes |
| `FRONTEND_URL` | Frontend URL for CORS | Yes |
| `EMAIL_HOST` | SMTP server (optional) | No |
| `EMAIL_PORT` | SMTP port (optional) | No |
| `EMAIL_USER` | Email username (optional) | No |
| `EMAIL_PASS` | Email password (optional) | No |

### Frontend (`frontend/.env.local`)

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_API_URL` | Backend API URL | Yes |

## Troubleshooting

### Database Connection Issues
- Verify `DATABASE_URL` format (should start with `postgresql://`)
- Check you replaced `[YOUR-PASSWORD]` with actual password
- Ensure Supabase project is active (not paused)

### Port Already in Use
- Change `PORT` in `backend/.env` (e.g., 5001)
- Update `NEXT_PUBLIC_API_URL` in `frontend/.env.local` to match

### Prisma Issues
- Run `npx prisma generate` after setting `DATABASE_URL`
- Ensure you're in the `backend` folder when running Prisma commands

## License

MIT
