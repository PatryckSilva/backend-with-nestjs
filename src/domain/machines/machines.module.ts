import { Module } from '@nestjs/common';
import { InfraModule } from '../../infra/infra.module';
import { PrismaService } from '../../infra/prisma/prisma.service';
import { MachinesRepository } from './machines.repository';
import { MachinesController } from './machines.controller';
import { MachinesService } from './services/machine.service';

@Module({
  imports: [InfraModule],
  providers: [
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
