import { Module } from '@nestjs/common';
import { InfraModule } from './infra/infra.module';
import { AppController } from './app.controller';
import { DomainModule } from './domain/domain.module';
import { SocketGatewayModule } from './socketgateway/gateway.module';

@Module({
  imports: [InfraModule, DomainModule, SocketGatewayModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
