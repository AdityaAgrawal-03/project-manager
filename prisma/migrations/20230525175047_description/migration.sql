-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "description" TEXT;

-- CreateIndex
CREATE INDEX "Task_ownerId_idx" ON "Task"("ownerId");
