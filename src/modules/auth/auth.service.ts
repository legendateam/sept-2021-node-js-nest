import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';

import { IResponse } from '../../interfaces';
import { PrismaService } from '../../core/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prismaService: PrismaService) {}

  public async createUser(
    data: Prisma.UserCreateInput,
  ): Promise<IResponse<User>> {
    const user = await this.prismaService.user.create({ data });
    return { data: user };
  }
}
