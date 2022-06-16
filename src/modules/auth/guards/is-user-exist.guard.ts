import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';

import { PrismaService } from '../../../core/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class IsUserExistGuard implements CanActivate {
  constructor(private readonly prismaService: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();

      if (!request.body) {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: 'Bad Request',
          },
          HttpStatus.BAD_REQUEST,
        );
      }

      const { email, phone } = request.body as Prisma.UserCreateInput;

      const user = await this.prismaService.user.findFirst({
        where: {
          OR: [{ phone: phone as string }, { email: email as string }],
        },
      });

      if (user) {
        throw new HttpException(
          {
            status: HttpStatus.FOUND,
            error: 'User is already registered',
          },
          HttpStatus.FOUND,
        );
      }

      return true;
    } catch (e) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: e.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
