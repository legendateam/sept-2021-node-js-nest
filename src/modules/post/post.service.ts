import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Post, Prisma } from '@prisma/client';

import { IResponse } from '../../interfaces';
import { PrismaService } from '../../core/prisma.service';
import { MainEnum } from '../../enum';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

@Injectable()
export class PostService {
  constructor(private prismaService: PrismaService) {}

  public async getAll(): Promise<IResponse<Post[]>> {
    const posts = await this.prismaService.post.findMany({
      where: { deletedAt: null },
    });
    return {
      data: posts,
    };
  }

  public async getOneById(id: string): Promise<IResponse<Post>> {
    const post = await this.prismaService.post.findUnique({
      where: { id: Number(id) },
    });
    if (post.deletedAt === null) {
      return {
        data: post,
      };
    }

    throw new HttpException(
      {
        status: HttpStatus.FORBIDDEN,
        message: 'Post has been deleted',
      },
      HttpStatus.FORBIDDEN,
    );
  }

  public async updateOne(
    { text, title, published }: Prisma.PostUpdateInput,
    paramsId: string,
  ): Promise<IResponse<Post>> {
    if (!text && !title && !published) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message: 'Bad Request',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const id = Number(paramsId);
    const postUpdated = await this.prismaService.post.update({
      where: { id },
      data: { text, title, published },
    });
    return {
      data: postUpdated,
    };
  }

  public async createOne(
    data: Prisma.PostCreateInput,
  ): Promise<IResponse<Post>> {
    const post = await this.prismaService.post.create({ data });
    return {
      data: post,
    };
  }

  public async softDeleteOne(
    paramsId: string,
  ): Promise<IResponse<MainEnum.SUCCESSFULLY>> {
    const id = Number(paramsId);
    await this.prismaService.post.update({
      where: { id },
      data: { deletedAt: dayjs.utc().format() },
    });

    return {
      data: MainEnum.SUCCESSFULLY,
    };
  }

  public async deleteOne(
    paramsId: string,
  ): Promise<IResponse<MainEnum.SUCCESSFULLY>> {
    const id = Number(paramsId);
    await this.prismaService.post.delete({ where: { id } });

    return {
      data: MainEnum.SUCCESSFULLY,
    };
  }
}
