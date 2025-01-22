import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { SocketGateway } from './gateways/socket';

@Module({
  imports: [],
  providers: [PrismaService, SocketGateway],
  exports: [PrismaService, SocketGateway],
})
export class InfraModule {}
