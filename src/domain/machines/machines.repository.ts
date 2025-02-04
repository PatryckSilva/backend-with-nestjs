import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../../infra/prisma/prisma.service';
import {
  IMachinesRepository,
  StatusType,
  TCreateMachine,
  TMachineListResponse,
  TUpdateMachine,
} from './interfaces';

@Injectable()
export class MachinesRepository implements IMachinesRepository {
  @Inject(PrismaService)
  private readonly prismaService: PrismaService;

  async findAll() {
    return this.prismaService.machine.findMany();
  }

  async create(data: TCreateMachine) {
    return this.prismaService.machine.create({ data });
  }

  async update(id: string, fieldsToUpdate: TUpdateMachine) {
    const updateResponse = await this.prismaService.machine.update({
      where: { id },
      data: fieldsToUpdate,
    });

    return updateResponse;
  }

  async findByName(name: string) {
    return this.prismaService.machine.findFirst({
      where: { name },
    });
  }

  async findById(id: string) {
    return this.prismaService.machine.findUnique({
      where: { id },
    });
  }

  async findByStatus(status: StatusType) {
    return this.prismaService.machine.findMany({ where: { status } });
  }

  async createMachineLog(machine: TMachineListResponse, status: string) {
    return this.prismaService.machineLog.create({
      data: {
        machineName: machine.name,
        status,
        machine: { connect: { id: machine.id } },
      },
    });
  }

  async getMachineLogs() {
    return this.prismaService.machineLog.findMany({
      orderBy: { updatedAt: 'desc' },
    });
  }
}
