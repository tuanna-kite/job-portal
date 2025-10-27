/*
  Warnings:

  - Changed the type of `category` on the `need_reports` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `gender` to the `users` table without a default value. This is not possible if the table is not empty.
  - Made the column `birthDate` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Changed the type of `disabilityType` on the `users` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Made the column `phone` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('male', 'female');

-- CreateEnum
CREATE TYPE "NeedSupportCategory" AS ENUM ('JOB_SEEKING', 'TRAINING_EDUCATION', 'ASSISTIVE_DEVICES', 'FINANCIAL_ASSISTANCE', 'HEALTHCARE_SUPPORT', 'HOUSING_SUPPORT', 'TRANSPORTATION_SUPPORT', 'LEGAL_SUPPORT', 'SOCIAL_INCLUSION', 'COUNSELING_MENTAL_HEALTH', 'TECHNICAL_SUPPORT', 'VOLUNTEER_ASSISTANCE', 'OTHER');

-- AlterTable
ALTER TABLE "need_reports" DROP COLUMN "category",
ADD COLUMN     "category" "NeedSupportCategory" NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "gender",
ADD COLUMN     "gender" "Gender" NOT NULL,
ALTER COLUMN "birthDate" SET NOT NULL,
DROP COLUMN "disabilityType",
ADD COLUMN     "disabilityType" "DisabilityType" NOT NULL,
ALTER COLUMN "phone" SET NOT NULL;
