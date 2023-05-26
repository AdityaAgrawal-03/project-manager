/*
  Warnings:

  - The values [ONGOING,RELEASED] on the enum `TASK_STATUS` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `estimate` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `isDeleted` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `estimate` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `isDeleted` on the `Task` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[ownerId,name]` on the table `Project` will be added. If there are existing duplicate values, this will fail.
  - Made the column `lastName` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "TASK_STATUS_new" AS ENUM ('PRIORITIZED', 'STARTED', 'COMPLETED');
ALTER TABLE "Task" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Task" ALTER COLUMN "status" TYPE "TASK_STATUS_new" USING ("status"::text::"TASK_STATUS_new");
ALTER TYPE "TASK_STATUS" RENAME TO "TASK_STATUS_old";
ALTER TYPE "TASK_STATUS_new" RENAME TO "TASK_STATUS";
DROP TYPE "TASK_STATUS_old";
ALTER TABLE "Task" ALTER COLUMN "status" SET DEFAULT 'PRIORITIZED';
COMMIT;

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "estimate",
DROP COLUMN "isDeleted",
ADD COLUMN     "due" TIMESTAMP(3),
ADD COLUMN     "isCompleted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "description",
DROP COLUMN "estimate",
DROP COLUMN "isDeleted",
ADD COLUMN     "due" TIMESTAMP(3),
ADD COLUMN     "isCompleted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "lastName" SET NOT NULL;

-- CreateIndex
CREATE INDEX "Project_ownerId_id_idx" ON "Project"("ownerId", "id");

-- CreateIndex
CREATE UNIQUE INDEX "Project_ownerId_name_key" ON "Project"("ownerId", "name");

-- CreateIndex
CREATE INDEX "Task_ownerId_idx" ON "Task"("ownerId");
