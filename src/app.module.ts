import { Module } from '@nestjs/common';
import { InfraModule } from './infra/infra.module';
import { AppController } from './app.controller';
import { DomainModule } from './domain/domain.module';
import { SocketGatewayModule } from './socketgateway/gateway.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    InfraModule,
    DomainModule,
    SocketGatewayModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
