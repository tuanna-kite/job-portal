/*
  Warnings:

  - A unique constraint covering the columns `[cccd]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[phone]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cccd` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "DisabilityType" AS ENUM ('VISION_IMPAIRMENT', 'HEARING_IMPAIRMENT', 'SPEECH_IMPAIRMENT', 'PHYSICAL_DISABILITY', 'INTELLECTUAL_DISABILITY', 'MENTAL_DISABILITY', 'AUTISM_SPECTRUM', 'LEARNING_DISABILITY', 'MULTIPLE_DISABILITIES', 'OTHER');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "address" TEXT,
ADD COLUMN     "cccd" VARCHAR NOT NULL,
ADD COLUMN     "phone" VARCHAR(20);

-- CreateIndex
CREATE UNIQUE INDEX "users_cccd_key" ON "users"("cccd");

-- CreateIndex
CREATE UNIQUE INDEX "users_phone_key" ON "users"("phone");
