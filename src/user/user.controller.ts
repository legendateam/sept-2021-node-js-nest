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
  Put,
} from '@nestjs/common';

import { UserService } from './user.service';
import { CreateUserDto } from './dto';
import { IResponse } from '../interfaces';
import { IUser } from './interfaces';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @HttpCode(HttpStatus.OK)
  @Get('')
  getAll(): IResponse<IUser[]> {
    return this.userService.getAll();
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  getOneById(@Param('id') id: string): IResponse<IUser> {
    return this.userService.getOneById(+id);
  }

  @HttpCode(HttpStatus.OK)
  @Get('softDeletes/all')
  getAllSoftDeletes(): IResponse<IUser[]> {
    return this.userService.getAllSoftDeletes();
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('')
  createOne(@Body() user: CreateUserDto): IResponse<IUser> {
    return this.userService.createOne(user);
  }

  @HttpCode(HttpStatus.OK)
  @Put(':id')
  replaceOne(
    @Param('id') id: string,
    @Body() user: CreateUserDto,
  ): IResponse<IUser> {
    return this.userService.replaceOne(+id, user);
  }

  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  updateOne(
    @Param('id') id: string,
    @Body() user: Partial<CreateUserDto>,
  ): IResponse<IUser> {
    return this.userService.updateOne(+id, user);
  }

  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  deleteOne(@Param('id') id: string): IResponse<string> {
    return this.userService.deleteOneById(+id);
  }

  @HttpCode(HttpStatus.OK)
  @Delete('softDeletes/:id')
  softDeleteOne(@Param('id') id: string): IResponse<string> {
    return this.userService.softDelete(+id);
  }
}
