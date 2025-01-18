import { Module } from '@nestjs/common';
import { InfraModule } from '../../infra/infra.module';
import { PrismaService } from '../../infra/prisma/prisma.service';
import { MachinesRepository } from './machines.repository';
import { MachinesController } from './machines.controller';
import { MachinesService } from './services/machine.service';
import { SocketGateway } from 'src/socketgateway/gateway';
import { SocketGatewayModule } from 'src/socketgateway/gateway.module';

@Module({
  imports: [InfraModule, SocketGatewayModule],
  providers: [
    SocketGateway,
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
