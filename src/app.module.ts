import { Module } from '@nestjs/common';
import { InfraModule } from './infra/infra.module';
import { AppController } from './app.controller';
import { DomainModule } from './domain/domain.module';

@Module({
  imports: [InfraModule, DomainModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
