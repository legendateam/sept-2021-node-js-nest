import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { User } from '@prisma/client';

import { CreatedUserDto } from './dto';
import { IResponse } from '../../interfaces';
import { AuthService } from './auth.service';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ITokensPair } from './interfaces';
import { LoginDto } from './dto/login.dto';
import { IsUserExistGuard } from './guards';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(IsUserExistGuard)
  @ApiOperation({ summary: 'create User' })
  @ApiCreatedResponse({
    status: HttpStatus.CREATED,
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

  @ApiOperation({ summary: 'User authorization' })
  @ApiOkResponse({
    schema: {
      example: {
        data: {
          access:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtYWlsQGdtYWkuY29tIiwicGFzc3dv',
          refresh:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtYWlsQGdtYWkuY29tIiwicGFzc3dv',
        },
      },
    },
  })
  @ApiUnauthorizedResponse()
  @Post('login')
  public login(@Body() data: LoginDto): Promise<IResponse<ITokensPair>> {
    return this.authService.login(data);
  }
}
