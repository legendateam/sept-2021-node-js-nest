import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from '../../core/prisma.service';
import { AuthGuard, RegistrationUserExistGuard } from './guards';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';
import { S3Module } from '../s3/s3.module';
import { S3Service } from '../s3/s3.service';
import { FileUploadInterceptorService } from '../../helpers';

@Module({
  providers: [
    AuthService,
    PrismaService,
    RegistrationUserExistGuard,
    AuthGuard,
    UserService,
    S3Service,
    FileUploadInterceptorService,
  ],
  controllers: [AuthController],
  imports: [JwtModule, forwardRef(() => UserModule), S3Module],
})
export class AuthModule {}
