import { Inject } from '@nestjs/common';
import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { TUpdateMachine } from 'src/domain/machines/interfaces';
import { MachinesService } from 'src/domain/machines/services/machine.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @Inject(MachinesService)
  private readonly machineService: MachinesService;
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    console.log('new user connected', client.id);
  }

  handleDisconnect(client: Socket) {
    console.log('user disconnected', client.id);
  }

  @SubscribeMessage('newUpdate')
  async updateMachine(
    @MessageBody()
    data: string,
  ) {
    try {
      const dataToSend = JSON.parse(data);

      const responseUpdate =
        await this.machineService.executeUpdateStatus(dataToSend);

      this.server.emit('newUpdate', {
        msg: 'received new Update',
        content: responseUpdate,
      });
    } catch (e) {
      this.server.emit('newUpdate', {
        msg: 'Error updating machine',
        error: e.message,
      });
    }
  }
}
