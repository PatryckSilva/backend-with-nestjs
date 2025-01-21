-- CreateTable
CREATE TABLE "MachineLog" (
    "id" SERIAL NOT NULL,
    "machineName" TEXT NOT NULL,
    "machineId" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MachineLog_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MachineLog" ADD CONSTRAINT "MachineLog_machineId_fkey" FOREIGN KEY ("machineId") REFERENCES "machine"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
