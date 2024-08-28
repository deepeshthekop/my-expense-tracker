/*
  Warnings:

  - Changed the type of `type` on the `Budget` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Budget" DROP COLUMN "type",
ADD COLUMN     "type" "Category" NOT NULL;

-- DropEnum
DROP TYPE "Budgets";
