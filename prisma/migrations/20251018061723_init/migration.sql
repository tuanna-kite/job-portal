-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('pending', 'active', 'archived');

-- CreateEnum
CREATE TYPE "RepRole" AS ENUM ('rep', 'rep_lead');

-- CreateEnum
CREATE TYPE "RepStatus" AS ENUM ('active', 'suspended');

-- CreateEnum
CREATE TYPE "RegionLevel" AS ENUM ('province', 'district', 'ward');

-- CreateEnum
CREATE TYPE "AdminRole" AS ENUM ('super_admin', 'coordinator');

-- CreateEnum
CREATE TYPE "OpportunityLocationType" AS ENUM ('remote', 'hybrid', 'onsite');

-- CreateEnum
CREATE TYPE "OpportunityStatus" AS ENUM ('open', 'closed');

-- CreateEnum
CREATE TYPE "CaseStatus" AS ENUM ('pending', 'in_progress', 'matched', 'rejected', 'done');

-- CreateEnum
CREATE TYPE "NeedReportCreatedBy" AS ENUM ('user', 'rep');

-- CreateEnum
CREATE TYPE "NeedReportStatus" AS ENUM ('open', 'reviewing', 'resolved');

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL,
    "fullName" VARCHAR(255) NOT NULL,
    "gender" VARCHAR(20),
    "birthDate" DATE,
    "disabilityType" VARCHAR(100) NOT NULL,
    "skills" TEXT[],
    "desiredJob" VARCHAR(255),
    "status" "UserStatus" NOT NULL DEFAULT 'pending',
    "regionId" UUID,
    "repId" UUID,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "representatives" (
    "id" UUID NOT NULL,
    "fullName" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "phone" VARCHAR(20),
    "organization" VARCHAR(255),
    "role" "RepRole" NOT NULL DEFAULT 'rep',
    "status" "RepStatus" NOT NULL DEFAULT 'active',
    "regionScopeId" UUID,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "representatives_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "regions" (
    "id" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "level" "RegionLevel" NOT NULL,
    "parentId" UUID,

    CONSTRAINT "regions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "admins" (
    "id" UUID NOT NULL,
    "fullName" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "role" "AdminRole" NOT NULL DEFAULT 'coordinator',
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "admins_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "opportunities" (
    "id" UUID NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "requirements" TEXT,
    "locationType" "OpportunityLocationType" NOT NULL DEFAULT 'remote',
    "salaryRange" VARCHAR(100),
    "source" VARCHAR(255),
    "status" "OpportunityStatus" NOT NULL DEFAULT 'open',
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "opportunities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cases" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "status" "CaseStatus" NOT NULL DEFAULT 'pending',
    "notes" TEXT,
    "opportunityId" UUID NOT NULL,
    "assignedRepId" UUID,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "cases_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "need_reports" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "status" "NeedReportStatus" NOT NULL DEFAULT 'open',
    "createdBy" "NeedReportCreatedBy" NOT NULL DEFAULT 'user',
    "category" VARCHAR(100) NOT NULL,
    "description" TEXT NOT NULL,
    "attachments" TEXT[],
    "assignedToId" UUID,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "need_reports_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "users_regionId_idx" ON "users"("regionId");

-- CreateIndex
CREATE INDEX "users_repId_idx" ON "users"("repId");

-- CreateIndex
CREATE UNIQUE INDEX "representatives_email_key" ON "representatives"("email");

-- CreateIndex
CREATE INDEX "representatives_regionScopeId_idx" ON "representatives"("regionScopeId");

-- CreateIndex
CREATE INDEX "regions_parentId_idx" ON "regions"("parentId");

-- CreateIndex
CREATE UNIQUE INDEX "admins_email_key" ON "admins"("email");

-- CreateIndex
CREATE INDEX "cases_userId_idx" ON "cases"("userId");

-- CreateIndex
CREATE INDEX "cases_opportunityId_idx" ON "cases"("opportunityId");

-- CreateIndex
CREATE INDEX "cases_assignedRepId_idx" ON "cases"("assignedRepId");

-- CreateIndex
CREATE INDEX "need_reports_userId_idx" ON "need_reports"("userId");

-- CreateIndex
CREATE INDEX "need_reports_assignedToId_idx" ON "need_reports"("assignedToId");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_regionId_fkey" FOREIGN KEY ("regionId") REFERENCES "regions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_repId_fkey" FOREIGN KEY ("repId") REFERENCES "representatives"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "representatives" ADD CONSTRAINT "representatives_regionScopeId_fkey" FOREIGN KEY ("regionScopeId") REFERENCES "regions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "regions" ADD CONSTRAINT "regions_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "regions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cases" ADD CONSTRAINT "cases_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cases" ADD CONSTRAINT "cases_opportunityId_fkey" FOREIGN KEY ("opportunityId") REFERENCES "opportunities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cases" ADD CONSTRAINT "cases_assignedRepId_fkey" FOREIGN KEY ("assignedRepId") REFERENCES "representatives"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "need_reports" ADD CONSTRAINT "need_reports_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "need_reports" ADD CONSTRAINT "need_reports_assignedToId_fkey" FOREIGN KEY ("assignedToId") REFERENCES "representatives"("id") ON DELETE SET NULL ON UPDATE CASCADE;
