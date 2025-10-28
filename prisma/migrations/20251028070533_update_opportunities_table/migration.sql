/*
  Warnings:

  - You are about to drop the column `source` on the `opportunities` table. All the data in the column will be lost.
  - Added the required column `address` to the `opportunities` table without a default value. This is not possible if the table is not empty.
  - Added the required column `partnerId` to the `opportunities` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "opportunities" DROP COLUMN "source",
ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "partnerId" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "opportunities" ADD CONSTRAINT "opportunities_partnerId_fkey" FOREIGN KEY ("partnerId") REFERENCES "partners"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
