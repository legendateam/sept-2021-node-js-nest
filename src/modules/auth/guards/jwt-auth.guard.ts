import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const authorization = request.headers.authorization;

      if (!authorization) {
        throw new UnauthorizedException();
      }

      const bearer = authorization.split(' ')[0];
      const token = authorization.split(' ')[1];

      if (!bearer || bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException();
      }

      request.token = token;

      return true;
    } catch (e) {
      console.log(e.messages);
    }
  }
}
