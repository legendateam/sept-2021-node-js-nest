import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from '../../core/prisma.service';
import { AuthGuard, IsUserExistGuard } from './guards';

@Module({
  providers: [AuthService, PrismaService, IsUserExistGuard, AuthGuard],
  controllers: [AuthController],
  imports: [JwtModule],
})
export class AuthModule {}
