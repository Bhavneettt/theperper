# Supabase Database Setup Guide

This guide will help you set up your Supabase database for The Perspective application.

## Prerequisites

- A Supabase account ([sign up](https://supabase.com))
- Node.js 18+ installed

## Step 1: Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign in
2. Click **"New Project"**
3. Fill in your project details:
   - **Name**: The Perspective
   - **Database Password**: Create a strong password (**save this!**)
   - **Region**: Choose the closest region to your users
   - **Pricing Plan**: Free tier is fine for development
4. Click **"Create new project"**
5. Wait 1-2 minutes for the project to be provisioned

## Step 2: Get Your Database Connection String

1. In your Supabase project dashboard, go to **Settings** → **Database**
2. Scroll down to **Connection string** section
3. Click the **URI** tab
4. Copy the connection string (format: `postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres`)
5. **Important**: Replace `[YOUR-PASSWORD]` with the actual database password you created in Step 1

Example:
```
postgresql://postgres:MySecurePassword123@db.abcdefghijklmnop.supabase.co:5432/postgres
```

## Step 3: Set Up the Database Schema

### Option A: Using Supabase SQL Editor (Recommended)

1. In your Supabase dashboard, go to **SQL Editor**
2. Click **New query**
3. Open `supabase/schema.sql` from this project
4. Copy the entire contents
5. Paste into the SQL Editor
6. Click **Run** (or press Ctrl+Enter / Cmd+Enter)
7. Wait for success message: "Success. No rows returned"

### Option B: Using Prisma Migrate

1. Set up your `backend/.env` file first (see Step 4)
2. Run Prisma migrations:
```bash
cd backend
npx prisma migrate dev --name init
```

## Step 4: Verify Database Setup

1. In Supabase dashboard, go to **Table Editor**
2. You should see all the tables:
   - User
   - Category
   - Article
   - Interview
   - Podcast
   - Event
   - Tag
   - Newsletter
   - Poll
   - PollOption
   - Vote
   - Contribution

## Step 5: Seed the Database (Optional)

To add sample data:

1. Go to **SQL Editor** in Supabase dashboard
2. Click **New query**
3. Open `supabase/seed.sql` from this project
4. Copy and paste the contents
5. Click **Run**

This will add:
- Sample categories
- Sample user/contributor
- Sample tags
- Sample poll

## Step 6: Configure Backend Environment

Create `backend/.env` file:

```env
# Supabase Database Connection
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@db.xxxxx.supabase.co:5432/postgres"

# JWT Secret - Generate a random string (32+ characters)
# Windows PowerShell: [Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Maximum 256 }))
# Or use: https://randomkeygen.com/
JWT_SECRET="your-super-secret-jwt-key-minimum-32-characters"

# Server Configuration
PORT=5000
NODE_ENV=development
FRONTEND_URL="http://localhost:3000"

# Email Configuration (Optional)
EMAIL_HOST="smtp.gmail.com"
EMAIL_PORT=587
EMAIL_USER="your-email@gmail.com"
EMAIL_PASS="your-app-password"
```

**Important**: Replace `YOUR_PASSWORD` with your actual Supabase database password.

## Step 7: Generate Prisma Client

After setting up the schema, generate the Prisma client:

```bash
cd backend
npx prisma generate
```

## Step 8: Test Your Setup

1. Start your backend:
```bash
cd backend
npm run dev
```

2. You should see: "Server running on port 5000" with no database connection errors

## Connection String Formats

### Direct Connection (for Prisma)
```
postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres
```

### Connection Pooling (for production)
```
postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres
```

Use the direct connection for Prisma migrations and development.

## Troubleshooting

### Connection Issues

**Error: "password authentication failed"**
- Double-check your password in the connection string
- Make sure you're using the database password (not your Supabase account password)
- Verify the connection string format

**Error: "connection timeout"**
- Check if your IP is allowed in Supabase dashboard
- Go to **Settings** → **Database** → **Connection pooling** and check IP restrictions

### Prisma Issues

**Error: "Can't reach database server"**
- Verify your `DATABASE_URL` is correct
- Check if your Supabase project is active (not paused)
- Try the connection pooling URL instead

**Error: "relation does not exist"**
- Make sure you ran `supabase/schema.sql` in SQL Editor
- Check if migrations were applied: `npx prisma migrate status`

### Schema Issues

**Error: "type already exists"**
- The enums might already exist. You can skip those lines or drop them first:
```sql
DROP TYPE IF EXISTS "Role" CASCADE;
DROP TYPE IF EXISTS "EventType" CASCADE;
DROP TYPE IF EXISTS "ContributionType" CASCADE;
DROP TYPE IF EXISTS "ContributionStatus" CASCADE;
```

## Production Considerations

1. **Use Connection Pooling**: Switch to the pooling connection string for production
2. **Enable Row Level Security**: Set up RLS policies in Supabase
3. **Backup**: Supabase automatically backs up your database
4. **Monitoring**: Use Supabase dashboard to monitor queries and performance
5. **Environment Variables**: Never commit `.env` files to git

## Next Steps

1. ✅ Database is set up
2. ✅ Schema is created
3. ✅ Sample data is seeded (optional)
4. ⏭️ Start your backend: `cd backend && npm run dev`
5. ⏭️ Start your frontend: `cd frontend && npm run dev`

## Useful Links

- [Supabase Dashboard](https://app.supabase.com)
- [Supabase Documentation](https://supabase.com/docs)
- [Prisma + Supabase Guide](https://supabase.com/docs/guides/integrations/prisma)
