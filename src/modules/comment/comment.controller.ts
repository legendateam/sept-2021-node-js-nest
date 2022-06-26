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
  UseGuards,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Comment } from '@prisma/client';

import { IResponse } from '../../interfaces';
import { CommentService } from './comment.service';
import { CreateCommentDto, UpdateCommentDto } from './dto';
import { MainEnum } from '../../enum';
import { AuthGuard } from '../auth/guards';

@ApiTags('comments')
@Controller('comments')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @ApiOperation({ summary: 'get All Comments' })
  @ApiOkResponse({
    schema: {
      example: {
        data: [
          {
            id: 1,
            createdAt: '2022-06-25T20:03:04.610Z',
            updatedAt: '2022-06-25T20:03:04.610Z',
            deletedAt: null,
            published: false,
            name: 'fdcfv',
            content: 'asdasdasdasdasdasdasdasdasdsd',
            postId: 6,
            userId: 50,
          },
        ],
      },
    },
  })
  @HttpCode(HttpStatus.OK)
  @Get('')
  public async getAll(): Promise<IResponse<Comment[]>> {
    return this.commentService.getAll();
  }

  @ApiOperation({ summary: 'get All Comments' })
  @ApiOkResponse({
    schema: {
      example: {
        data: {
          id: 1,
          createdAt: '2022-06-25T20:03:04.610Z',
          updatedAt: '2022-06-25T20:03:04.610Z',
          deletedAt: null,
          published: false,
          name: 'fdcfv',
          content: 'asdasdasdasdasdasdasdasdasdsd',
          postId: 6,
          userId: 50,
        },
      },
    },
  })
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  public async getOneById(
    @Param('id') id: string,
  ): Promise<IResponse<Comment>> {
    return this.commentService.getOneById(id);
  }

  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Update Comment' })
  @ApiOkResponse({
    schema: {
      example: {
        data: {
          id: 1,
          createdAt: '2022-06-25T20:03:04.610Z',
          updatedAt: '2022-06-25T20:03:04.610Z',
          deletedAt: null,
          published: false,
          name: 'fdcfv',
          content: 'asdasdasdasdasdasdasdasdasdsd',
          postId: 6,
          userId: 50,
        },
      },
    },
  })
  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  public async updateOne(
    @Body() comment: UpdateCommentDto,
    @Param('id') id: string,
  ): Promise<IResponse<Comment>> {
    return this.commentService.updateOne(comment, id);
  }

  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Create Comment' })
  @ApiCreatedResponse({
    schema: {
      example: {
        data: {
          id: 1,
          createdAt: '2022-06-25T20:03:04.610Z',
          updatedAt: '2022-06-25T20:03:04.610Z',
          deletedAt: null,
          published: false,
          name: 'fdcfv',
          content: 'asdasdasdasdasdasdasdasdasdsd',
          postId: 6,
          userId: 50,
        },
      },
    },
  })
  @HttpCode(HttpStatus.CREATED)
  @Post('')
  public async createOne(
    @Body() comment: CreateCommentDto,
  ): Promise<IResponse<Comment>> {
    return this.commentService.createOne(comment);
  }

  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'get All Comments' })
  @ApiOkResponse({
    schema: {
      example: {
        data: MainEnum.SUCCESSFULLY,
      },
    },
  })
  @HttpCode(HttpStatus.OK)
  @Delete('softDeleted/:id')
  public async softDeleteOne(
    @Param('id') id: string,
  ): Promise<IResponse<MainEnum.SUCCESSFULLY>> {
    return this.commentService.softDeleteOne(id);
  }

  @ApiOperation({ summary: 'get All Comments' })
  @ApiOkResponse({
    schema: {
      example: {
        data: MainEnum.SUCCESSFULLY,
      },
    },
  })
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  public async deleteOne(
    @Body() comment: UpdateCommentDto,
    @Param('id') id: string,
  ): Promise<IResponse<MainEnum.SUCCESSFULLY>> {
    return this.commentService.deleteOne(id);
  }
}
