import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Comment, Prisma } from '@prisma/client';

import { PrismaService } from '../../core/prisma.service';
import { IResponse } from '../../interfaces';
import { MainEnum } from '../../enum';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

@Injectable()
export class CommentService {
  constructor(private prismaService: PrismaService) {}

  public async getAll(): Promise<IResponse<Comment[]>> {
    const comments = await this.prismaService.comment.findMany({
      where: { deletedAt: null },
    });
    return {
      data: comments,
    };
  }

  public async getOneById(paramsId: string): Promise<IResponse<Comment>> {
    const id = Number(paramsId);
    const comment = await this.prismaService.comment.findUnique({
      where: { id },
    });

    if (comment.deletedAt !== null) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          messages: 'Comment is deleted',
        },
        HttpStatus.FORBIDDEN,
      );
    }
    return { data: comment };
  }

  public async updateOne(
    { content, published, name }: Prisma.CommentUpdateInput,
    paramsId: string,
  ): Promise<IResponse<Comment>> {
    if (!content && !published && !name) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message: 'Bad Request',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const id = Number(paramsId);
    const commentUpdated = await this.prismaService.comment.update({
      where: { id },
      data: { published, content, name },
    });

    return { data: commentUpdated };
  }

  public async softDeleteOne(
    paramsId: string,
  ): Promise<IResponse<MainEnum.SUCCESSFULLY>> {
    const id = Number(paramsId);
    await this.prismaService.comment.update({
      where: { id },
      data: { deletedAt: dayjs.utc().format() },
    });

    return { data: MainEnum.SUCCESSFULLY };
  }

  public async deleteOne(
    paramsId: string,
  ): Promise<IResponse<MainEnum.SUCCESSFULLY>> {
    const id = Number(paramsId);
    await this.prismaService.comment.delete({ where: { id } });

    return { data: MainEnum.SUCCESSFULLY };
  }

  public async createOne(
    data: Prisma.CommentCreateInput,
  ): Promise<IResponse<Comment>> {
    const comment = await this.prismaService.comment.create({ data });

    return { data: comment };
  }
}
