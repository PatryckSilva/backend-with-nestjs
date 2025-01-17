import { Prisma } from '@prisma/client';

export type TCreateMachine = Pick<
  Prisma.MachineCreateInput,
  'name' | 'location' | 'status'
>;

export type TUpdateMachine = Pick<
  Prisma.MachineUpdateInput,
  'location' | 'status'
>;
export interface IMachinesRepository {
  findAll(): Promise<MachineResponse[]>;
  create(data: TCreateMachine): Promise<MachineResponse>;
  update(id: string, fieldsToUpdate: TUpdateMachine): any;
  findByName(name: string): any;
  findById(id: string): any;
}

export type MachineResponse = {
  id: string;
  name: string;
  location: string;
  status: StatusType;
  createdAt: string;
  updatedAt: string;
};

export enum StatusType {
  operating = 'OPERATING',
  maintenance = 'MAINTENANCE',
  off = 'OFF',
}
