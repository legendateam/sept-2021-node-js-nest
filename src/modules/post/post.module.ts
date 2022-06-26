import { forwardRef, Module } from '@nestjs/common';

import { PostController } from './post.controller';
import { PostService } from './post.service';
import { PrismaService } from '../../core/prisma.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [forwardRef(() => AuthModule)],
  controllers: [PostController],
  providers: [PostService, PrismaService],
})
export class PostModule {}
