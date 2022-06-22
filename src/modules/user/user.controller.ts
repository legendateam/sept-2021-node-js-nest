import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';

import { IResponse } from '../../interfaces';
import { UserService } from './user.service';
import { UpdatedUserDto } from './dto';
import { MainEnum } from '../../enum';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { fileFilter, fileName } from '../../helpers';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOperation({ summary: 'get all Users' })
  @ApiOkResponse({
    status: HttpStatus.OK,
    schema: {
      example: {
        data: [
          {
            id: 1,
            createdAt: '2022-06-14T18:46:19.683Z',
            updatedAt: '2022-06-14T18:46:19.686Z',
            deletedAt: null,
            name: 'Oleg',
            age: 30,
            email: 'email@email.com',
            phone: '+380(63)-44-44-444',
            login: 'userr',
            status: false,
            password: 'Qwerty12345',
            role: 'USER',
          },
          {
            id: 2,
            createdAt: '2022-06-14T18:46:19.683Z',
            updatedAt: '2022-06-14T18:46:19.686Z',
            deletedAt: null,
            name: 'Oleg',
            age: 30,
            email: 'email@email.com',
            phone: '+380(63)-44-44-444',
            login: 'userr',
            status: false,
            password: 'Qwerty12345',
            role: 'USER',
          },
        ],
      },
    },
  })
  @HttpCode(HttpStatus.OK)
  @Get('')
  public async getAll(): Promise<IResponse<User[]>> {
    return this.userService.getAll();
  }

  @ApiOperation({ summary: 'get All deleted users (soft deleted)' })
  @ApiOkResponse({
    status: HttpStatus.OK,
    schema: {
      example: {
        data: [
          {
            id: 1,
            createdAt: '2022-06-14T18:46:19.683Z',
            updatedAt: '2022-06-14T18:46:19.686Z',
            deletedAt: '2022-07-14T18:46:19.686Z',
            name: 'Oleg',
            age: 30,
            email: 'email@email.com',
            phone: '+380(63)-44-44-444',
            login: 'userr',
            status: false,
            password: 'Qwerty12345',
            role: 'USER',
          },
          {
            id: 2,
            createdAt: '2022-06-14T18:46:19.683Z',
            updatedAt: '2022-06-14T18:46:19.686Z',
            deletedAt: '2022-07-14T18:46:19.686Z',
            name: 'Oleg',
            age: 30,
            email: 'email@email.com',
            phone: '+380(63)-44-44-444',
            login: 'userr',
            status: false,
            password: 'Qwerty12345',
            role: 'USER',
          },
        ],
      },
    },
  })
  @HttpCode(HttpStatus.OK)
  @Get('deleted')
  public async getAllDeleted(): Promise<IResponse<User[]>> {
    return this.userService.getAllDeleted();
  }

  @ApiOperation({ summary: 'get One User By Id' })
  @ApiOkResponse({
    schema: {
      example: {
        data: {
          id: 1,
          createdAt: '2022-06-14T18:46:19.683Z',
          updatedAt: '2022-06-14T18:46:19.686Z',
          deletedAt: null,
          name: 'Oleg',
          age: 30,
          email: 'email@email.com',
          phone: '+380(63)-44-44-444',
          login: 'userr',
          status: false,
          password: 'Qwerty12345',
          role: 'USER',
        },
      },
    },
  })
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  public async getOneById(@Param('id') id: string): Promise<IResponse<User>> {
    return this.userService.getOneById(id);
  }

  @ApiOperation({ summary: 'update some fields user by id name, role, status' })
  @ApiOkResponse({
    schema: {
      example: {
        data: {
          id: 1,
          createdAt: '2022-06-14T18:46:19.683Z',
          updatedAt: '2022-06-14T18:46:19.686Z',
          deletedAt: null,
          name: 'Oleg',
          age: 30,
          email: 'email@email.com',
          phone: '+380(63)-44-44-444',
          login: 'userr',
          status: false,
          password: 'Qwerty12345',
          role: 'USER',
        },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor('avatar', {
      storage: diskStorage({
        destination: './avatars',
        filename: fileName,
      }),
      fileFilter: fileFilter,
    }),
  )
  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  public async updateOne(
    @UploadedFile() file: Express.Multer.File,
    @Param('id') id: string,
    @Body() data: UpdatedUserDto,
  ): Promise<IResponse<User>> {
    return this.userService.updateOne(data, id, file);
  }

  @ApiOperation({ summary: 'delete for user, but further stored in db' })
  @ApiOkResponse({
    schema: {
      example: {
        data: 'SUCCESSFULLY',
      },
    },
  })
  @HttpCode(HttpStatus.OK)
  @Delete('softDeletes/:id')
  public async softDeleteOne(
    @Param('id') id: string,
  ): Promise<Partial<IResponse<MainEnum.SUCCESSFULLY>>> {
    return this.userService.softDeleteOne(id);
  }

  @ApiOperation({ summary: 'delete forever of db' })
  @ApiOkResponse({
    schema: {
      example: {
        data: 'SUCCESSFULLY',
      },
    },
  })
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  public async deleteOne(
    @Param('id') id: string,
  ): Promise<Partial<IResponse<MainEnum.SUCCESSFULLY>>> {
    return this.userService.deleteOne(id);
  }
}
