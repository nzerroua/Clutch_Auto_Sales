/*
  Warnings:

  - Added the required column `style` to the `Car` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Car" ADD COLUMN     "style" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "Car_make_idx" ON "Car"("make");

-- CreateIndex
CREATE INDEX "Car_model_idx" ON "Car"("model");

-- CreateIndex
CREATE INDEX "Car_style_idx" ON "Car"("style");
