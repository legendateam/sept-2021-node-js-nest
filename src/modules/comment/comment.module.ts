import { forwardRef, Module } from '@nestjs/common';

import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { PrismaService } from '../../core/prisma.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [forwardRef(() => AuthModule)],
  controllers: [CommentController],
  providers: [CommentService, PrismaService],
})
export class CommentModule {}
