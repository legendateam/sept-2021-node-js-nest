import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from '../../../core/prisma.service';
import { UserService } from '../../user/user.service';

@Injectable()
export class RegistrationUserExistGuard implements CanActivate {
  constructor(
    private readonly prismaService: PrismaService,
    private userService: UserService,
  ) {}

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
