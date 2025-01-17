import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../../infra/prisma/prisma.service';
import { IMachinesRepository } from './interfaces';
import { Prisma } from '@prisma/client';

@Injectable()
export class MachinesRepository implements IMachinesRepository {
  @Inject(PrismaService)
  private readonly prismaService: PrismaService;

  async findAll(): Promise<any> {
    return this.prismaService.machine.findMany({
      select: {
        telemetry: true,
      },
    });
  }

  async create(data: Prisma.MachineCreateInput): Promise<any> {
    return this.prismaService.machine.create({ data });
  }

  // async findById(roundId: string): Promise<any> {
  //   return this.prismaService.leaderboard.findFirst({
  //     where: { roundId },
  //     select: {
  //       Prizes: {
  //         select: {
  //           position: true,
  //           playerWallet: true,
  //           prizeAmount: true,
  //         },
  //       },
  //       Round: {
  //         select: {
  //           amount: true,
  //         },
  //       },
  //       isPaid: true,
  //       id: true,
  //     },
  //   });
  // }

  // async find(params: Prisma.MachineFindManyArgs): Promise<any> {
  //   return this.prismaService.leaderboard.findMany(params);
  // }
}
