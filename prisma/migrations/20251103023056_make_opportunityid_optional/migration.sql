-- AlterTable
-- Make opportunityId optional to allow auto-creation of cases from user side
ALTER TABLE "cases" ALTER COLUMN "opportunityId" DROP NOT NULL;

