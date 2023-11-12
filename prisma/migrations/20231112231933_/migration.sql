/*
  Warnings:

  - Added the required column `dayNumber` to the `ReservedCourses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hour` to the `ReservedCourses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ReservedCourses" ADD COLUMN     "dayNumber" INTEGER NOT NULL,
ADD COLUMN     "hour" TEXT NOT NULL;
