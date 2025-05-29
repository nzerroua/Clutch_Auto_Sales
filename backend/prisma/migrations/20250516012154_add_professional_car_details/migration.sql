/*
  Warnings:

  - You are about to drop the column `body` on the `Car` table. All the data in the column will be lost.
  - You are about to drop the column `cylinders` on the `Car` table. All the data in the column will be lost.
  - You are about to drop the column `epaCity` on the `Car` table. All the data in the column will be lost.
  - You are about to drop the column `epaHighway` on the `Car` table. All the data in the column will be lost.
  - You are about to drop the column `stockNumber` on the `Car` table. All the data in the column will be lost.
  - You are about to drop the column `trim` on the `Car` table. All the data in the column will be lost.
  - You are about to drop the column `upholstery` on the `Car` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Car" DROP COLUMN "body",
DROP COLUMN "cylinders",
DROP COLUMN "epaCity",
DROP COLUMN "epaHighway",
DROP COLUMN "stockNumber",
DROP COLUMN "trim",
DROP COLUMN "upholstery",
ADD COLUMN     "description" TEXT,
ADD COLUMN     "features" TEXT[];
