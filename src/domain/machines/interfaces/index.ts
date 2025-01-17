import { Prisma } from '@prisma/client';

export type TPrismaMachineInput = Prisma.MachineCreateInput;

export interface IMachinesRepository {
  findAll(): Promise<MachineResponse[]>;
  // findById(id: string): Promise<MachineResponse | null>;
  create(data: TPrismaMachineInput): Promise<MachineResponse>;
  // find(params: Prisma.MachineFindManyArgs): Promise<MachineResponse[]>;
}

type MachineResponse = Prisma.MachineGetPayload<{
  include: {
    telemetry: true;
  };
}>;
