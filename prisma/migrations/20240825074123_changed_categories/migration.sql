/*
  Warnings:

  - The values [RENT,MAINTAINENCE,FOOD,MISCELLANEOUS] on the enum `Category` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Category_new" AS ENUM ('HOME', 'UTILITIES', 'INSAURANCE', 'LOAN', 'SUBSCRIPTIONS', 'GROCERIES', 'DINING', 'TRANSPORT', 'SHOPPING', 'ENTERTAINMENT', 'GROOMING', 'HEALTH', 'EDUCATION', 'GIVING', 'CASH', 'CHARGES', 'TRAVEL');
ALTER TABLE "Expense" ALTER COLUMN "category" TYPE "Category_new" USING ("category"::text::"Category_new");
ALTER TABLE "Budget" ALTER COLUMN "type" TYPE "Category_new" USING ("type"::text::"Category_new");
ALTER TYPE "Category" RENAME TO "Category_old";
ALTER TYPE "Category_new" RENAME TO "Category";
DROP TYPE "Category_old";
COMMIT;
