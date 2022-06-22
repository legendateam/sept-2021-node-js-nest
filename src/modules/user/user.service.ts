import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';

import { PrismaService } from '../../core/prisma.service';
import { IResponse } from '../../interfaces';
import { MainEnum } from '../../enum';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { S3Service } from '../s3/s3.service';
import { TypeFileUploadEnum } from '../../enum/type-file-upload.enum';
import fs from 'fs';
import path from 'path';

dayjs.extend(utc);

@Injectable()
export class UserService {
  constructor(
    private prismaService: PrismaService,
    private s3Service: S3Service,
  ) {}

  public async getAll(): Promise<IResponse<User[]>> {
    const users = await this.prismaService.user.findMany({
      where: { deletedAt: null },
    });

    return { data: users };
  }

  public async getAllDeleted(): Promise<IResponse<User[]>> {
    const users = await this.prismaService.user.findMany({
      where: {
        NOT: {
          deletedAt: null,
        },
      },
    });

    return { data: users };
  }

  public async getOneByEmailOrPhone({
    email,
    phone,
  }: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prismaService.user.findFirst({
      where: {
        OR: [{ phone: phone as string }, { email: email as string }],
      },
    });
  }

  public async getOneById(paramsId: string): Promise<IResponse<User>> {
    const id = Number(paramsId);
    const user = await this.prismaService.user.findUnique({ where: { id } });

    if (user.deletedAt === null) {
      return { data: user };
    }

    throw new HttpException(
      {
        status: HttpStatus.UNAUTHORIZED,
        message: 'Account has been deleted',
      },
      HttpStatus.UNAUTHORIZED,
    );
  }

  public async updateOne(
    { status, role, name }: Prisma.UserUpdateInput,
    paramsId: string,
    file: Express.Multer.File,
  ): Promise<IResponse<User>> {
    if (!status && !role && !name && !file) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Bad Request',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    if (file) {
      try {
        await this.s3Service.fileUpload(file, TypeFileUploadEnum.USERS);
        fs.unlink(path.join(process.cwd(), 'avatars', file.filename), (err) => {
          if (err) console.error(err.message);
        });
      } catch (e) {
        if (e) console.error(e.message);
      }
    }

    const id = Number(paramsId);
    const updatedUser = await this.prismaService.user.update({
      where: { id },
      data: { status, role, name, avatar: file.filename },
    });

    return {
      data: updatedUser,
    };
  }

  public async softDeleteOne(
    paramsId: string,
  ): Promise<Partial<IResponse<MainEnum.SUCCESSFULLY>>> {
    const id = Number(paramsId);

    await this.prismaService.user.update({
      where: { id },
      data: { deletedAt: dayjs.utc().format() },
    });

    return {
      message: MainEnum.SUCCESSFULLY,
    };
  }

  public async deleteOne(
    paramsId: string,
  ): Promise<Partial<IResponse<MainEnum.SUCCESSFULLY>>> {
    const id = Number(paramsId);
    await this.prismaService.user.delete({ where: { id } });

    return { message: MainEnum.SUCCESSFULLY };
  }
}
