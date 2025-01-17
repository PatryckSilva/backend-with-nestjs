import { Module } from '@nestjs/common';
import { MachinesModule } from './machines/machines.module';

@Module({
  imports: [MachinesModule],
  providers: [],
  exports: [MachinesModule],
})
export class DomainModule {}
