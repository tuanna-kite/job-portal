/*
  Warnings:

  - A unique constraint covering the columns `[phone]` on the table `partners` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `phone` to the `partners` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "partners" ADD COLUMN     "phone" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "partners_phone_key" ON "partners"("phone");

-- CreateIndex
CREATE INDEX "partners_phone_idx" ON "partners"("phone");
