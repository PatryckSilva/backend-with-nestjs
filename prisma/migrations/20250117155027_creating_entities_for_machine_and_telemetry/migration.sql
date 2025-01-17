-- CreateEnum
CREATE TYPE "Status" AS ENUM ('OPERATING', 'MAINTENANCE', 'OFF');

-- CreateTable
CREATE TABLE "machine" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "status" "Status" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "machine_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "telemetry" (
    "id" TEXT NOT NULL,
    "machineId" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "location" TEXT NOT NULL,
    "status" "Status" NOT NULL,

    CONSTRAINT "telemetry_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "telemetry" ADD CONSTRAINT "telemetry_machineId_fkey" FOREIGN KEY ("machineId") REFERENCES "machine"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
