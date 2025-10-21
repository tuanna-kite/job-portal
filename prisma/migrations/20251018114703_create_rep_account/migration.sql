/*
  Warnings:

  - A unique constraint covering the columns `[accountId]` on the table `representatives` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "representatives" ADD COLUMN     "accountId" UUID;

-- CreateIndex
CREATE UNIQUE INDEX "representatives_accountId_key" ON "representatives"("accountId");

-- CreateIndex
CREATE INDEX "representatives_accountId_idx" ON "representatives"("accountId");

-- AddForeignKey
ALTER TABLE "representatives" ADD CONSTRAINT "representatives_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "admins"("id") ON DELETE SET NULL ON UPDATE CASCADE;
