-- DropForeignKey
ALTER TABLE "public"."cases" DROP CONSTRAINT "cases_opportunityId_fkey";

-- AddForeignKey
ALTER TABLE "cases" ADD CONSTRAINT "cases_opportunityId_fkey" FOREIGN KEY ("opportunityId") REFERENCES "opportunities"("id") ON DELETE SET NULL ON UPDATE CASCADE;
