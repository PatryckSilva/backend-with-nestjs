import { Module } from '@nestjs/common';
import { InfraModule } from '../../infra/infra.module';
import { PrismaService } from '../../infra/prisma/prisma.service';
import { MachinesRepository } from './machines.repository';
import { MachinesController } from './machines.controller';
import { MachinesService } from './services/machine.service';
import { LoggerModule } from 'src/logger/logger.module';
import { LoggerService } from 'src/logger/logger.service';
import { SocketGateway } from 'src/infra/gateways/socket';

@Module({
  imports: [InfraModule, LoggerModule],
  providers: [
    SocketGateway,
    LoggerService,
    MachinesService,
    PrismaService,
    {
      provide: 'IMachinesRepository',
      useClass: MachinesRepository,
    },
  ],
  controllers: [MachinesController],
  exports: [],
})
export class MachinesModule {}
