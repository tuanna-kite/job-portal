/*
  Warnings:

  - Made the column `phone` on table `representatives` required. This step will fail if there are existing NULL values in that column.
  - Made the column `organization` on table `representatives` required. This step will fail if there are existing NULL values in that column.
  - Made the column `regionScopeId` on table `representatives` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "public"."representatives" DROP CONSTRAINT "representatives_regionScopeId_fkey";

-- AlterTable
ALTER TABLE "representatives" ALTER COLUMN "phone" SET NOT NULL,
ALTER COLUMN "organization" SET NOT NULL,
ALTER COLUMN "regionScopeId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "representatives" ADD CONSTRAINT "representatives_regionScopeId_fkey" FOREIGN KEY ("regionScopeId") REFERENCES "regions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
