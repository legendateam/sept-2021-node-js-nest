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
import { Comment } from '@prisma/client';

import { IResponse } from '../../interfaces';
import { CommentService } from './comment.service';
import { CreateCommentDto, UpdateCommentDto } from './dto';
import { MainEnum } from '../../enum';

@ApiTags('comments')
@Controller('comments')
export class CommentController {
  constructor(private commentService: CommentService) {}

  // @ApiOperation({ summary: 'get All Comments' })
  // @ApiOkResponse({
  //   schema: {
  //     example: {
  //
  //     }
  //   }
  // })
  @HttpCode(HttpStatus.OK)
  @Get('')
  public async getAll(): Promise<IResponse<Comment[]>> {
    return this.commentService.getAll();
  }

  // @ApiOperation({ summary: 'get All Comments' })
  // @ApiOkResponse({
  //   schema: {
  //     example: {
  //
  //     }
  //   }
  // })
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  public async getOneById(
    @Param('id') id: string,
  ): Promise<IResponse<Comment>> {
    return this.commentService.getOneById(id);
  }
  //
  // @ApiOperation({ summary: 'get All Comments' })
  // @ApiOkResponse({
  //   schema: {
  //     example: {
  //
  //     }
  //   }
  // })

  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  public async updateOne(
    @Body() comment: UpdateCommentDto,
    @Param('id') id: string,
  ): Promise<IResponse<Comment>> {
    return this.commentService.updateOne(comment, id);
  }
  //
  // @ApiOperation({ summary: 'get All Comments' })
  // @ApiOkResponse({
  //   schema: {
  //     example: {
  //
  //     }
  //   }
  // })
  @HttpCode(HttpStatus.OK)
  @Post('')
  public async createOne(
    @Body() comment: CreateCommentDto,
  ): Promise<IResponse<Comment>> {
    return this.commentService.createOne(comment);
  }
  //
  // @ApiOperation({ summary: 'get All Comments' })
  // @ApiOkResponse({
  //   schema: {
  //     example: {
  //
  //     }
  //   }
  // })
  @HttpCode(HttpStatus.OK)
  @Delete('softDeleted/:id')
  public async softDeleteOne(
    @Param('id') id: string,
  ): Promise<IResponse<MainEnum.SUCCESSFULLY>> {
    return this.commentService.softDeleteOne(id);
  }
  //
  // @ApiOperation({ summary: 'get All Comments' })
  // @ApiOkResponse({
  //   schema: {
  //     example: {
  //
  //     }
  //   }
  // })
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  public async deleteOne(
    @Body() comment: UpdateCommentDto,
    @Param('id') id: string,
  ): Promise<IResponse<MainEnum.SUCCESSFULLY>> {
    return this.commentService.deleteOne(id);
  }
  //
}
