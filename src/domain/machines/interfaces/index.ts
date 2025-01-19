import { $Enums, Prisma, Status } from '@prisma/client';

export type TCreateMachine = Pick<
  Prisma.MachineCreateInput,
  'name' | 'location' | 'status'
>;

export type TUpdateMachine = Pick<
  Prisma.MachineUpdateInput,
  'location' | 'status'
>;
export interface IMachinesRepository {
  findAll(): Promise<TMachineListResponse[]>;
  create(data: TCreateMachine): Promise<TMachineUpdateOrCreateResponse>;
  update(
    id: string,
    fieldsToUpdate: TUpdateMachine,
  ): Promise<TMachineUpdateOrCreateResponse>;
  findByName(name: string): Promise<TSingleMachineWithArgs>;
  findById(id: string): Promise<TSingleMachineWithArgs>;
  findByStatus(status: StatusType): Promise<TMachineListResponse[]>;
}

type TMachineListResponse = {
  name: string;
  location: string;
  status: $Enums.Status;
  id: string;
  createdAt: Date;
  updatedAt: Date;
};

type TMachineUpdateOrCreateResponse = {
  id: string;
  name: string;
  location: string;
  status: Status;
  createdAt: Date;
  updatedAt: Date;
};

type TSingleMachineWithArgs = {
  name: string;
  location: string;
  status: $Enums.Status;
  id: string;
  createdAt: Date;
  updatedAt: Date;
} | null;

export enum StatusType {
  operating = 'OPERATING',
  maintenance = 'MAINTENANCE',
  off = 'OFF',
}
