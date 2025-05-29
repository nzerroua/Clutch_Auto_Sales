/*
  Warnings:

  - You are about to drop the column `name` on the `ContactForm` table. All the data in the column will be lost.
  - Added the required column `firstName` to the `ContactForm` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `ContactForm` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ContactForm" DROP COLUMN "name",
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "lastName" TEXT NOT NULL,
ADD COLUMN     "phone" TEXT,
ALTER COLUMN "message" DROP NOT NULL;

-- CreateTable
CREATE TABLE "FinancingRequest" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "message" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FinancingRequest_pkey" PRIMARY KEY ("id")
);
