ALTER TABLE "AssignedSupervisor"
ADD COLUMN "guardId" UUID;

ALTER TABLE "AssignedSupervisor"
ADD CONSTRAINT "AssignedSupervisor_guardId_fkey"
FOREIGN KEY ("guardId") REFERENCES "Guard"("id") ON DELETE CASCADE;