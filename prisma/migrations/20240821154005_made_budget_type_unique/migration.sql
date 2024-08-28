/*
  Warnings:

  - A unique constraint covering the columns `[type]` on the table `Budget` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Budget_type_key" ON "Budget"("type");
