-- AlterTable
-- Add needReportId column to cases table to link cases with need_reports
ALTER TABLE "cases" ADD COLUMN "needReportId" UUID;

-- CreateIndex
-- Create unique index on needReportId to ensure one-to-one relationship
CREATE UNIQUE INDEX "cases_needReportId_key" ON "cases"("needReportId");

-- CreateIndex
-- Create regular index for faster queries
CREATE INDEX "cases_needReportId_idx" ON "cases"("needReportId");

-- AddForeignKey
-- Add foreign key constraint to maintain referential integrity
ALTER TABLE "cases" ADD CONSTRAINT "cases_needReportId_fkey" FOREIGN KEY ("needReportId") REFERENCES "need_reports"("id") ON DELETE SET NULL ON UPDATE CASCADE;

