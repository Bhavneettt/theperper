-- The Perspective Database Schema for Supabase
-- Run this in your Supabase SQL Editor

-- Enable UUID extension (if not already enabled)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create Enums
CREATE TYPE "Role" AS ENUM ('READER', 'CONTRIBUTOR', 'EDITOR', 'ADMIN');
CREATE TYPE "EventType" AS ENUM ('CONFERENCE', 'WEBINAR', 'WORKSHOP', 'PRODUCT_LAUNCH', 'AWARD_CEREMONY', 'INDUSTRY_MEET');
CREATE TYPE "ContributionType" AS ENUM ('ARTICLE', 'INTERVIEW', 'OPINION');
CREATE TYPE "ContributionStatus" AS ENUM ('PENDING', 'REVIEWING', 'APPROVED', 'REJECTED');

-- Users Table
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL UNIQUE,
    "name" TEXT,
    "password" TEXT,
    "role" "Role" NOT NULL DEFAULT 'READER',
    "bio" TEXT,
    "avatar" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- Categories Table
CREATE TABLE "Category" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL UNIQUE,
    "slug" TEXT NOT NULL UNIQUE,
    "description" TEXT,
    "color" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Tags Table
CREATE TABLE "Tag" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL UNIQUE,
    "slug" TEXT NOT NULL UNIQUE
);

-- Articles Table
CREATE TABLE "Article" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL UNIQUE,
    "excerpt" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "publishedAt" TIMESTAMP(3),
    "readTime" INTEGER NOT NULL DEFAULT 5,
    "views" INTEGER NOT NULL DEFAULT 0,
    "imageUrl" TEXT,
    "authorId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Article_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Article_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- Interviews Table
CREATE TABLE "Interview" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL UNIQUE,
    "excerpt" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "publishedAt" TIMESTAMP(3),
    "readTime" INTEGER NOT NULL DEFAULT 10,
    "views" INTEGER NOT NULL DEFAULT 0,
    "imageUrl" TEXT,
    "interviewee" TEXT NOT NULL,
    "interviewerId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Interview_interviewerId_fkey" FOREIGN KEY ("interviewerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Interview_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- Podcasts Table
CREATE TABLE "Podcast" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL UNIQUE,
    "description" TEXT NOT NULL,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "publishedAt" TIMESTAMP(3),
    "duration" INTEGER NOT NULL,
    "audioUrl" TEXT NOT NULL,
    "imageUrl" TEXT,
    "views" INTEGER NOT NULL DEFAULT 0,
    "guestId" TEXT,
    "hostId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Podcast_hostId_fkey" FOREIGN KEY ("hostId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Podcast_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- Events Table
CREATE TABLE "Event" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL UNIQUE,
    "description" TEXT NOT NULL,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "eventType" "EventType" NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "location" TEXT NOT NULL,
    "isVirtual" BOOLEAN NOT NULL DEFAULT false,
    "imageUrl" TEXT,
    "capacity" INTEGER,
    "registered" INTEGER NOT NULL DEFAULT 0,
    "categoryId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Event_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- Article Tags Junction Table
CREATE TABLE "_ArticleToTag" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_ArticleToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "Article"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ArticleToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- Interview Tags Junction Table
CREATE TABLE "_InterviewToTag" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_InterviewToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "Interview"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_InterviewToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- Podcast Tags Junction Table
CREATE TABLE "_PodcastToTag" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_PodcastToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "Podcast"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_PodcastToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- Event Tags Junction Table
CREATE TABLE "_EventToTag" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_EventToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_EventToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- Newsletter Table
CREATE TABLE "Newsletter" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL UNIQUE,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- Polls Table
CREATE TABLE "Poll" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "question" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3)
);

-- Poll Options Table
CREATE TABLE "PollOption" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "text" TEXT NOT NULL,
    "pollId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "PollOption_pollId_fkey" FOREIGN KEY ("pollId") REFERENCES "Poll"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- Votes Table
CREATE TABLE "Vote" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "pollId" TEXT NOT NULL,
    "optionId" TEXT NOT NULL,
    "userIp" TEXT,
    "userAgent" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Vote_pollId_fkey" FOREIGN KEY ("pollId") REFERENCES "Poll"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Vote_optionId_fkey" FOREIGN KEY ("optionId") REFERENCES "PollOption"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- Contributions Table
CREATE TABLE "Contribution" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" "ContributionType" NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "status" "ContributionStatus" NOT NULL DEFAULT 'PENDING',
    "authorId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Contribution_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- Create Indexes for better performance
CREATE INDEX "Article_slug_idx" ON "Article"("slug");
CREATE INDEX "Article_published_idx" ON "Article"("published");
CREATE INDEX "Article_featured_idx" ON "Article"("featured");
CREATE INDEX "Article_publishedAt_idx" ON "Article"("publishedAt");
CREATE INDEX "Interview_slug_idx" ON "Interview"("slug");
CREATE INDEX "Interview_published_idx" ON "Interview"("published");
CREATE INDEX "Podcast_slug_idx" ON "Podcast"("slug");
CREATE INDEX "Podcast_published_idx" ON "Podcast"("published");
CREATE INDEX "Event_slug_idx" ON "Event"("slug");
CREATE INDEX "Event_startDate_idx" ON "Event"("startDate");
CREATE INDEX "Vote_pollId_userIp_idx" ON "Vote"("pollId", "userIp");
CREATE UNIQUE INDEX "Vote_pollId_userIp_key" ON "Vote"("pollId", "userIp");

-- Create updatedAt trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW."updatedAt" = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add triggers for updatedAt
CREATE TRIGGER update_user_updated_at BEFORE UPDATE ON "User"
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_article_updated_at BEFORE UPDATE ON "Article"
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_interview_updated_at BEFORE UPDATE ON "Interview"
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_podcast_updated_at BEFORE UPDATE ON "Podcast"
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_event_updated_at BEFORE UPDATE ON "Event"
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_newsletter_updated_at BEFORE UPDATE ON "Newsletter"
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_contribution_updated_at BEFORE UPDATE ON "Contribution"
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
