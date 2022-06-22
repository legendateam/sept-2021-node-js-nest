import { forwardRef, Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { AuthService } from '../auth/auth.service';
import { ChatGatewayService } from './services/chat.gateway.service';
import { PrismaService } from '../../core/prisma.service';
import { ChatService } from './services/chat.service';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';
import { S3Module } from '../s3/s3.module';
import { S3Service } from '../s3/s3.service';

@Module({
  providers: [
    ChatGatewayService,
    AuthService,
    PrismaService,
    ChatService,
    JwtService,
    UserService,
    S3Service,
  ],
  imports: [
    forwardRef(() => AuthModule),
    forwardRef(() => UserModule),
    forwardRef(() => S3Module),
  ],
})
export class ChatModule {}
