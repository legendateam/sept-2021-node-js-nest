import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { User } from '@prisma/client';

import { CreatedUserDto } from './dto';
import { IResponse } from '../../interfaces';
import { AuthService } from './auth.service';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'create User' })
  @ApiOkResponse({
    status: HttpStatus.OK,
    schema: {
      example: {
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
  })
  @ApiBadRequestResponse({
    schema: {
      example: {
        statusCode: 400,
        message: 'login must be longer than or equal to 5 characters',
        error: 'Bad Request',
      },
    },
  })
  @HttpCode(HttpStatus.OK)
  @Post('registration')
  public createUser(@Body() data: CreatedUserDto): Promise<IResponse<User>> {
    return this.authService.createUser(data);
  }
}
