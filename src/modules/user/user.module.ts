import { forwardRef, Module } from '@nestjs/common';

import { UserService } from './user.service';
import { PrismaService } from '../../core/prisma.service';
import { UserController } from './user.controller';
import { S3Module } from '../s3/s3.module';
import { FileUploadInterceptorService } from '../../helpers';
import { S3Service } from '../s3/s3.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  providers: [
    UserService,
    PrismaService,
    FileUploadInterceptorService,
    S3Service,
  ],
  imports: [S3Module, forwardRef(() => AuthModule)],
  controllers: [UserController],
})
export class UserModule {}
