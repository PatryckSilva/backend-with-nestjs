import { Module } from '@nestjs/common';
import { InfraModule } from '../../infra/infra.module';
import { PrismaService } from '../../infra/prisma/prisma.service';
import { MachinesRepository } from './machines.repository';
import { MachinesController } from './machines.controller';
import { MachinesService } from './services/machine.service';
import { SocketGateway } from 'src/socketgateway/gateway';
import { SocketGatewayModule } from 'src/socketgateway/gateway.module';
import { LoggerModule } from 'src/logger/logger.module';
import { LoggerService } from 'src/logger/logger.service';

@Module({
  imports: [InfraModule, SocketGatewayModule, LoggerModule],
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
