-- Migration: Add Industry Beats, Content Types, and Enhanced User Fields
-- Run this in Supabase SQL Editor

-- 1. Create IndustryBeat enum
DO $$ BEGIN
    CREATE TYPE "IndustryBeat" AS ENUM (
        'TECHNOLOGY_INNOVATION',
        'BUSINESS_LEADERSHIP',
        'SUSTAINABILITY_PURPOSE',
        'WORK_CULTURE',
        'CONSUMER_LIFESTYLE',
        'POLICY_PUBLIC_DISCOURSE',
        'EDUCATION_FUTURE_SKILLS',
        'HEALTH_WELLBEING'
    );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 2. Create ContentType enum
DO $$ BEGIN
    CREATE TYPE "ContentType" AS ENUM (
        'FEATURED_PERSPECTIVE',
        'INSIDER_VIEW',
        'DEBATE_ROOM',
        'PULSE_CHECK',
        'WEEKLY_DIGEST'
    );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 3. Add new columns to Category table
ALTER TABLE "Category" 
ADD COLUMN IF NOT EXISTS "beat" "IndustryBeat";

-- 4. Add new columns to User table
ALTER TABLE "User"
ADD COLUMN IF NOT EXISTS "title" TEXT,
ADD COLUMN IF NOT EXISTS "company" TEXT,
ADD COLUMN IF NOT EXISTS "industry" TEXT,
ADD COLUMN IF NOT EXISTS "credentials" TEXT;

-- 5. Add new columns to Article table
ALTER TABLE "Article"
ADD COLUMN IF NOT EXISTS "contentType" "ContentType",
ADD COLUMN IF NOT EXISTS "editorNote" TEXT,
ADD COLUMN IF NOT EXISTS "debateTopicId" TEXT;

-- 6. Create DebateTopic table
CREATE TABLE IF NOT EXISTS "DebateTopic" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL UNIQUE,
    "description" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 7. Add foreign key constraint for debateTopicId
DO $$ BEGIN
    ALTER TABLE "Article" 
    ADD CONSTRAINT "Article_debateTopicId_fkey" 
    FOREIGN KEY ("debateTopicId") 
    REFERENCES "DebateTopic"("id") 
    ON DELETE SET NULL;
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 8. Create indexes for better performance
CREATE INDEX IF NOT EXISTS "Category_beat_idx" ON "Category"("beat");
CREATE INDEX IF NOT EXISTS "Article_contentType_idx" ON "Article"("contentType");
CREATE INDEX IF NOT EXISTS "Article_debateTopicId_idx" ON "Article"("debateTopicId");

-- Success message
SELECT 'Migration completed successfully!' as status;
