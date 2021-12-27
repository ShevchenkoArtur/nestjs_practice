import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WsResponse,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';

@WebSocketGateway()
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private logger: Logger = new Logger('AppGateway');

  afterInit(server: Server): any {
    this.logger.log('Initialized!');
  }

  handleConnection(client: Socket, ...args: any[]): any {
    this.logger.log(`Client connected ${client.id}`);
  }

  handleDisconnect(client: Socket): any {
    this.logger.log(`Client disconnected ${client.id}`);
  }

  // V1 WITH TYPES
  @SubscribeMessage('msgToServer')
  handleMessage(client: Socket, text: string): WsResponse<string> {
    return { event: 'msgToClient', data: 'Hello world!' };
  }

  // V2 WITHOUT TYPES
  // @SubscribeMessage('msgToServer')
  // handleMessage(client: Socket, text: string): void {
  //   client.emit('msgToClient', text);
  // }
}
