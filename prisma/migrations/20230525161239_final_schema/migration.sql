/*
  Warnings:

  - The values [STARTED] on the enum `TASK_STATUS` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `due` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `isCompleted` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `due` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `isCompleted` on the `Task` table. All the data in the column will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "TASK_STATUS_new" AS ENUM ('PRIORITIZED', 'ONGOING', 'COMPLETED', 'RELEASED');
ALTER TABLE "Task" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Task" ALTER COLUMN "status" TYPE "TASK_STATUS_new" USING ("status"::text::"TASK_STATUS_new");
ALTER TYPE "TASK_STATUS" RENAME TO "TASK_STATUS_old";
ALTER TYPE "TASK_STATUS_new" RENAME TO "TASK_STATUS";
DROP TYPE "TASK_STATUS_old";
ALTER TABLE "Task" ALTER COLUMN "status" SET DEFAULT 'PRIORITIZED';
COMMIT;

-- DropIndex
DROP INDEX "Task_ownerId_idx";

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "due",
DROP COLUMN "isCompleted",
ADD COLUMN     "estimate" TIMESTAMP(3),
ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "due",
DROP COLUMN "isCompleted",
ADD COLUMN     "description" TEXT,
ADD COLUMN     "estimate" TIMESTAMP(3),
ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "lastName" DROP NOT NULL;
