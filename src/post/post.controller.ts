import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { PostService } from './post.service';
import { IResponse } from '../interfaces';
import { CreatePostDto } from './dto';
import { IPost } from './interfaces/post.interface';
import { UpdatePostDto } from './dto/update-post.dto';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @HttpCode(HttpStatus.OK)
  @Get('')
  getAll(): IResponse<IPost[]> {
    return this.postService.getAll();
  }

  @HttpCode(HttpStatus.OK)
  @Get('softDelete/all')
  getAllSoftDelete(): IResponse<IPost[]> {
    return this.postService.getAllSoftDelete();
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  getOneById(@Param('id') id: string): IResponse<IPost> {
    return this.postService.getOneById(+id);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('')
  createPost(@Body() post: CreatePostDto): IResponse<IPost> {
    return this.postService.createPost(post);
  }

  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  updateOne(
    @Param('id') id: string,
    @Body() post: Partial<UpdatePostDto>,
  ): IResponse<IPost> {
    return this.postService.updateOne(+id, post);
  }

  @HttpCode(HttpStatus.OK)
  @Put(':id')
  replaceOne(
    @Param('id') id: string,
    @Body() post: CreatePostDto,
  ): IResponse<IPost> {
    return this.postService.replaceOne(+id, post);
  }

  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  deleteOne(@Param('id') id: string): void {
    this.postService.deleteOne(+id);
  }

  @HttpCode(HttpStatus.OK)
  @Delete('softDelete/:id')
  softDeleteOne(@Param('id') id: string): void {
    this.postService.softDeleteOne(+id);
  }
}
