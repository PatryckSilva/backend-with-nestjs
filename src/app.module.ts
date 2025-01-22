import { Module } from '@nestjs/common';
import { InfraModule } from './infra/infra.module';
import { AppController } from './app.controller';
import { DomainModule } from './domain/domain.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [InfraModule, DomainModule, ScheduleModule.forRoot()],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
