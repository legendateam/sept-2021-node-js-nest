import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { PostModule } from './modules/post/post.module';
import { CommentModule } from './modules/comment/comment.module';
import { AuthModule } from './modules/auth/auth.module';
import { ChatModule } from './modules/chat/chat.module';

@Module({
  imports: [UserModule, PostModule, CommentModule, AuthModule, ChatModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
