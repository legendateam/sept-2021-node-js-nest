import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException, HttpStatus
} from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';
import { mainConfig } from '../../../configs';
import { PrismaService } from '../../../core/prisma.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    public readonly jwtService: JwtService,
    private readonly prismaService: PrismaService,
  ) {}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authorization = request.authorization;

    if (!authorization ) {
      throw new UnauthorizedException()
    }

    const bearer = authorization.split(' ')[0];
    const accessToken = authorization.split(' ')[1];

    if (!bearer || bearer !== 'Bearer' || !accessToken) {
      throw new UnauthorizedException();
    }

    const data = this.jwtService.verify(accessToken, {
      secret: mainConfig.SECRET_KEY_ACCESS_TOKEN,
    });

return true
  }
}
