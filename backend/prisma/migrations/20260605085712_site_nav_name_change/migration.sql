/*
  Warnings:

  - You are about to drop the column `display` on the `SiteNavigationPage` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "SiteNavigationPage" DROP COLUMN "display",
ADD COLUMN     "enabled" BOOLEAN NOT NULL DEFAULT true;
