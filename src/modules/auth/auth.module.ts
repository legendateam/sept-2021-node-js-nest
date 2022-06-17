import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from '../../core/prisma.service';
import { AuthGuard, RegistrationUserExistGuard } from './guards';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';

@Module({
  providers: [
    AuthService,
    PrismaService,
    RegistrationUserExistGuard,
    AuthGuard,
    UserService
  ],
  controllers: [AuthController],
  imports: [JwtModule, forwardRef(() => UserModule)],
})
export class AuthModule {}
