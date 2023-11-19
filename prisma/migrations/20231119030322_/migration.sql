/*
  Warnings:

  - Added the required column `room` to the `ReservedCourses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ReservedCourses" ADD COLUMN     "room" TEXT NOT NULL;
