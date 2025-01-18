import { Module } from '@nestjs/common';
import { SocketGateway } from './gateway';
import { DomainModule } from 'src/domain/domain.module';
import { MachinesService } from 'src/domain/machines/services/machine.service';
import { MachinesRepository } from 'src/domain/machines/machines.repository';
import { PrismaService } from 'src/infra/prisma/prisma.service';

@Module({
  imports: [DomainModule],
  providers: [
    SocketGateway,
    MachinesService,
    {
      provide: 'IMachinesRepository',
      useClass: MachinesRepository,
    },
    PrismaService,
  ],
})
export class SocketGatewayModule {}
