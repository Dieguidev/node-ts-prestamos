/*
  Warnings:

  - You are about to alter the column `money` on the `loans` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.
  - You are about to alter the column `interest` on the `loans` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.
  - You are about to alter the column `monthly_payment` on the `monthly_installments` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.

*/
-- AlterTable
ALTER TABLE "loans" ALTER COLUMN "money" SET DATA TYPE DECIMAL(10,2),
ALTER COLUMN "interest" SET DATA TYPE DECIMAL(10,2);

-- AlterTable
ALTER TABLE "monthly_installments" ALTER COLUMN "monthly_payment" SET DATA TYPE DECIMAL(10,2);
