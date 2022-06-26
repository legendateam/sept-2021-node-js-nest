import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from '@prisma/client';

import { UserService } from '../../user/user.service';
import { AuthDto } from '../dto/auth.dto';
import bcrypt from 'bcrypt';

@Injectable()
export class LoginUserExistGuard implements CanActivate {
  constructor(private userService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();

      if (!request.body.email || !request.body.password) {
        throw new BadRequestException();
      }

      const { email, password } = request.body as AuthDto;
      const user = await this.userService.getOneByEmailOrPhone({ email });

      if (!user) {
        throw new NotFoundException({
          status: HttpStatus.NOT_FOUND,
          message: 'User does not exist, please registration',
          error: 'Not Found',
        });
      }

      const compare = await bcrypt.compare(password, user.password);

      if (!compare) {
        throw new UnauthorizedException({
          status: HttpStatus.UNAUTHORIZED,
          message: 'Wrong email or password',
          error: 'Unauthorized',
        });
      }

      request.user = user as User;
      return true;
    } catch (e) {
      console.log(e.message);
    }
  }
}
