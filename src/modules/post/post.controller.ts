import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Post as PostDB } from '@prisma/client';

import { PostService } from './post.service';
import { IResponse } from '../../interfaces';
import { CreatePostDto, UpdatePostDto } from './dto';
import { MainEnum } from '../../enum';

@ApiTags('posts')
@Controller('posts')
export class PostController {
  constructor(private postService: PostService) {}

  @ApiOperation({ summary: 'get all posts' })
  @ApiOkResponse({
    schema: {
      example: {
        data: [
          {
            id: 1,
            createdAt: '2022-06-15T13:47:27.519Z',
            updatedAt: '2022-06-15T13:47:27.521Z',
            deletedAt: null,
            title: 'fdcfv',
            text: 'asdasdasdasdasdasdasdasdasdsd',
            published: false,
            authorId: 4,
          },
          {
            id: 2,
            createdAt: '2022-06-15T13:47:27.519Z',
            updatedAt: '2022-06-15T13:47:27.521Z',
            deletedAt: null,
            title: 'fdcfv',
            text: 'asdasdasdasdasdasdasdasdasdsd',
            published: false,
            authorId: 43,
          },
        ],
      },
    },
  })
  @HttpCode(HttpStatus.OK)
  @Get('')
  public async getAll(): Promise<IResponse<PostDB[]>> {
    return this.postService.getAll();
  }

  @ApiOperation({ summary: 'get One post By Id' })
  @ApiOkResponse({
    schema: {
      example: {
        data: {
          id: 1,
          createdAt: '2022-06-15T13:47:27.519Z',
          updatedAt: '2022-06-15T13:47:27.521Z',
          deletedAt: null,
          title: 'fdcfv',
          text: 'asdasdasdasdasdasdasdasdasdsd',
          published: false,
          authorId: 4,
        },
      },
    },
  })
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  public async getOneById(@Param('id') id: string): Promise<IResponse<PostDB>> {
    return this.postService.getOneById(id);
  }

  @ApiOperation({ summary: 'updated one post' })
  @ApiOkResponse({
    schema: {
      example: {
        data: {
          id: 1,
          createdAt: '2022-06-15T13:47:27.519Z',
          updatedAt: '2022-06-15T13:47:27.521Z',
          deletedAt: null,
          title: 'fdcfv',
          text: 'asdasdasdasdasdasdasdasdasdsd',
          published: false,
          authorId: 4,
        },
      },
    },
  })
  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  public async updateOne(
    @Param('id') id: string,
    @Body() data: UpdatePostDto,
  ): Promise<IResponse<PostDB>> {
    return this.postService.updateOne(data, id);
  }

  @ApiOperation({ summary: 'create post' })
  @ApiOkResponse({
    schema: {
      example: {
        data: {
          id: 1,
          createdAt: '2022-06-15T13:47:27.519Z',
          updatedAt: '2022-06-15T13:47:27.521Z',
          deletedAt: null,
          title: 'fdcfv',
          text: 'asdasdasdasdasdasdasdasdasdsd',
          published: false,
          authorId: 4,
        },
      },
    },
  })
  @HttpCode(HttpStatus.OK)
  @Post('')
  public async createOne(
    @Body() post: CreatePostDto,
  ): Promise<IResponse<PostDB>> {
    return this.postService.createOne(post);
  }

  @ApiOperation({ summary: 'delete post for user but post remains in db' })
  @ApiOkResponse({
    schema: {
      example: {
        message: MainEnum.SUCCESSFULLY,
      },
    },
  })
  @HttpCode(HttpStatus.OK)
  @Delete('softDeleted/:id')
  public async softDeleteOne(
    @Param('id') id: string,
  ): Promise<IResponse<MainEnum.SUCCESSFULLY>> {
    return this.postService.softDeleteOne(id);
  }

  @ApiOperation({ summary: 'complete removed' })
  @ApiOkResponse({
    schema: {
      example: {
        message: MainEnum.SUCCESSFULLY,
      },
    },
  })
  @HttpCode(HttpStatus.OK)
  @Delete('')
  public async deleteOne(
    @Param('id') id: string,
  ): Promise<IResponse<MainEnum.SUCCESSFULLY>> {
    return this.postService.softDeleteOne(id);
  }
}
