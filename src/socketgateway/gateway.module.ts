import { Module } from '@nestjs/common';
import { SocketGateway } from './gateway';

@Module({
  imports: [],
  providers: [SocketGateway],
  exports: [],
})
export class SocketGatewayModule {}
