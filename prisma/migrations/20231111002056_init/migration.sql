/*
  Warnings:

  - A unique constraint covering the columns `[sportigoId]` on the table `ReservedCourses` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ReservedCourses_sportigoId_key" ON "ReservedCourses"("sportigoId");
