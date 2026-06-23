-- SQL Script to Initialize Supabase Database Tables for Pathseekers School Website
-- Run this script in the Supabase SQL Editor (https://supabase.com) to create the required tables.

-- Create Enum Types if they don't exist
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'Role') THEN
        CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN', 'SUPER_ADMIN');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'BlogPostStatus') THEN
        CREATE TYPE "BlogPostStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'SCHEDULED');
    END IF;
END $$;

-- Create Table: AdminUser
CREATE TABLE IF NOT EXISTS "AdminUser" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "role" "Role" NOT NULL DEFAULT 'ADMIN',
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "clerkId" TEXT NOT NULL,
    "lastSeen" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AdminUser_pkey" PRIMARY KEY ("id")
);

-- Create Table: Student
CREATE TABLE IF NOT EXISTS "Student" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "class" TEXT NOT NULL,
    "rollNo" TEXT NOT NULL,
    "parentName" TEXT NOT NULL,
    "parentPhone" TEXT NOT NULL,
    "parentEmail" TEXT NOT NULL,
    "photo" TEXT,
    "academicRecord" TEXT,
    "attendance" DOUBLE PRECISION NOT NULL DEFAULT 100.0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- Create Table: BlogPost
CREATE TABLE IF NOT EXISTS "BlogPost" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "excerpt" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "featuredImage" TEXT,
    "status" "BlogPostStatus" NOT NULL DEFAULT 'DRAFT',
    "author" TEXT NOT NULL DEFAULT 'AI Assistant',
    "category" TEXT NOT NULL DEFAULT 'Education',
    "views" INTEGER NOT NULL DEFAULT 0,
    "metaTitle" TEXT,
    "metaDescription" TEXT,
    "keywords" TEXT,
    "scheduledAt" TIMESTAMP(3),
    "publishedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BlogPost_pkey" PRIMARY KEY ("id")
);

-- Create Table: SyncSettings
CREATE TABLE IF NOT EXISTS "SyncSettings" (
    "id" TEXT NOT NULL DEFAULT 'singleton',
    "autoPublish" BOOLEAN NOT NULL DEFAULT false,
    "highFrequency" BOOLEAN NOT NULL DEFAULT false,
    "regionalSync" BOOLEAN NOT NULL DEFAULT true,
    "category" TEXT NOT NULL DEFAULT 'Education',
    "scheduleTime" TEXT NOT NULL DEFAULT '08:00',
    "lastExecutedAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "customCategories" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "SyncSettings_pkey" PRIMARY KEY ("id")
);

-- Create Table: EditorialLog
CREATE TABLE IF NOT EXISTS "EditorialLog" (
    "id" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "level" TEXT NOT NULL DEFAULT 'INFO',
    "message" TEXT NOT NULL,

    CONSTRAINT "EditorialLog_pkey" PRIMARY KEY ("id")
);

-- Create Indexes if they don't exist
CREATE UNIQUE INDEX IF NOT EXISTS "AdminUser_email_key" ON "AdminUser"("email");
CREATE UNIQUE INDEX IF NOT EXISTS "AdminUser_clerkId_key" ON "AdminUser"("clerkId");
CREATE UNIQUE INDEX IF NOT EXISTS "BlogPost_slug_key" ON "BlogPost"("slug");

-- Insert Default SyncSettings if not already present
INSERT INTO "SyncSettings" ("id", "autoPublish", "highFrequency", "regionalSync", "category", "scheduleTime", "updatedAt")
VALUES ('singleton', true, false, true, 'Education', '08:00', CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;
