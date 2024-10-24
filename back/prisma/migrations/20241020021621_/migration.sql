-- DropForeignKey
ALTER TABLE "notifications" DROP CONSTRAINT "notifications_task_id_fkey";

-- AlterTable
ALTER TABLE "notifications" ALTER COLUMN "task_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "tasks"("task_id") ON DELETE SET NULL ON UPDATE CASCADE;
