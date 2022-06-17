import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  Req,
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
import { AuthGuard, RegistrationUserExistGuard } from './guards';
import {
  IRequestUserMiddleware,
  ITokenMiddleware,
} from './interfaces/middlewares';
import { LoginUserExistGuard } from './guards';
import { MainEnum } from '../../enum';
import { ForgotPasswordDto } from './dto/forgot-passwrod.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(RegistrationUserExistGuard)
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

  @UseGuards(LoginUserExistGuard)
  @ApiOperation({ summary: 'User authorization' })
  @ApiOkResponse({
    schema: {
      example: {
        data: {
          access:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtYWlsQGdtYWkuY29tIiwicGFzc3dv',
          refresh:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtYWlsQGdtYWkuY29tIiwicGFzc3dv',
          userid: 1,
        },
      },
    },
  })
  @ApiUnauthorizedResponse({
    schema: {
      example: {
        statusCode: HttpStatus.UNAUTHORIZED,
        message: 'Wrong token',
        error: 'UNAUTHORIZED',
      },
    },
  })
  @Post('login')
  public login(
    @Req() req: IRequestUserMiddleware,
  ): Promise<IResponse<ITokensPair>> {
    const user = req.user;
    return this.authService.login(user);
  }

  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'logout with a token' })
  @ApiOkResponse({
    status: HttpStatus.OK,
    schema: {
      example: {
        data: 'Successfully',
      },
    },
  })
  @ApiUnauthorizedResponse({
    schema: {
      example: {
        statusCode: HttpStatus.UNAUTHORIZED,
        message: 'Wrong token',
        error: 'UNAUTHORIZED',
      },
    },
  })
  @Post('logout')
  public logout(
    @Req() req: ITokenMiddleware,
  ): Promise<IResponse<MainEnum.SUCCESSFULLY>> {
    const accessToken = req.token;
    return this.authService.logout(accessToken);
  }

  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'forgot password' })
  @ApiOkResponse({
    status: HttpStatus.OK,
    schema: {
      example: {
        data: 'Successfully',
      },
    },
  })
  @ApiBadRequestResponse({
    schema: {
      example: {
        statusCode: 400,
        message: 'Wrong token',
        error: 'Bad Request',
      },
    },
  })
  @Patch('forgot-password')
  public forgotPassword(
    @Req() req: ITokenMiddleware,
    @Body() data: ForgotPasswordDto,
  ): Promise<IResponse<MainEnum.SUCCESSFULLY>> {
    const access_token = req.token;
    return this.authService.forgotPassword(access_token, data);
  }

  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'refresh for new generate pair tokens access and refresh',
  })
  @ApiOkResponse({
    schema: {
      example: {
        data: {
          access:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtYWlsQGdtYWkuY29tIiwicGFzc3dv',
          refresh:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtYWlsQGdtYWkuY29tIiwicGFzc3dv',
          userid: 1,
        },
      },
    },
  })
  @ApiUnauthorizedResponse({
    schema: {
      example: {
        statusCode: HttpStatus.UNAUTHORIZED,
        message: 'Wrong token',
        error: 'UNAUTHORIZED',
      },
    },
  })
  @Post('refresh')
  public async refresh(
    @Req() req: ITokenMiddleware,
  ): Promise<IResponse<ITokensPair>> {
    const refresh_token = req.token;
    return this.authService.refresh(refresh_token);
  }
}
