import { Injectable } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { AuthService } from '../../auth/auth.service';
import { IResponse } from '../../../interfaces';
import { IJoinRoom } from '../interfaces';
import { ChatService } from './chat.service';
// import { RoleEnum } from "../../user/enum";

@WebSocketGateway({
  pingTimeout: 30000,
  cors: { origin: '*' },
})
@Injectable()
export class ChatGatewayService {
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly authService: AuthService,
    private chatService: ChatService,
  ) {}

  @SubscribeMessage('join')
  public async handleJoin(
    @MessageBody() { access_token, roomName }: IJoinRoom,
    @ConnectedSocket() client: Socket,
  ): Promise<void> {
    const {
      role,
      id: userId,
      name,
    } = await this.authService.verifyToken(access_token);
    // const joinToRoom = await this.chatService.joinToRoom({ userId, roomId });

    // if (joinToRoom) {
    //   const {
    //     data: { name },
    //   } = await this.chatService.getUserJoined(userId);

    this.server.emit('join', { message: `Joined to room ${name}`, name });

    client.broadcast.emit('join', { message: `Joined to Room ${name}` });
    client.on('createMessage', async (text: string) => {
      // const successfully = await this.chatService.CreateMessage({
      //   text,
      //   roomName,
      //   userId,
      // });
      client.emit('createdMessage', { name, text });
    });
    // }
  }
}
