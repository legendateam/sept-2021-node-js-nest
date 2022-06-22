import { Injectable } from '@nestjs/common';
// import { JoinRoom, Messages, Prisma, User } from '@prisma/client';

import { PrismaService } from '../../../core/prisma.service';
import { MainEnum } from '../../../enum';
import { UserService } from '../../user/user.service';
import { IResponse } from '../../../interfaces';

@Injectable()
export class ChatService {
  constructor(
    private prismaService: PrismaService,
    private userService: UserService,
  ) {}

  // public async joinToRoom({
  //   roomId,
  //   userId,
  // }: any): Promise<JoinRoom> {
  //   return this.prismaService.joinRoom.create({ data: { roomName: roomId, userId } });
  // }
  //
  // public async getUserJoined(userId: number): Promise<IResponse<User>> {
  //   return this.userService.getOneById(userId.toString());
  // }
  //
  // public async CreateMessage(data: any): Promise<Messages> {
  //   return this.prismaService.messages.create({ data });
  // }
  //
  // public async deleteMessage(id: number): Promise<MainEnum.SUCCESSFULLY> {
  //   await this.prismaService.messages.delete({ where: { id } });
  //   return MainEnum.SUCCESSFULLY;
  // }
  //
  // public async getMessages(roomId: number): Promise<Messages[]> {
  //   return this.prismaService.messages.findMany({ where: { roomId } });
  // }
  //
  // public async leaveTheRoom({
  //   userId,
  //   roomId,
  // }: any): Promise<MainEnum.SUCCESSFULLY> {
  //   const { id } = await this.prismaService.joinRoom.findFirst({
  //     where: {
  //       AND: [{ roomName: roomId }, { userId }],
  //     },
  //   });
  //   await this.prismaService.joinRoom.delete({
  //     where: { id },
  //   });
  //   return MainEnum.SUCCESSFULLY;
  // }
}
