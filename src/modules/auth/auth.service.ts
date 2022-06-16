import { Injectable } from '@nestjs/common';
import { Prisma, User, TokenPair } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';

import { IResponse } from '../../interfaces';
import { PrismaService } from '../../core/prisma.service';
import { mainConfig } from '../../configs';
import { ITokensPair } from './interfaces';
import { JwtTokensPairEnum } from './enum';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  public async createUser(
    user: Prisma.UserCreateInput,
  ): Promise<IResponse<User>> {
    const hashPassword = await bcrypt.hash(
      user.password,
      Number(mainConfig.BCRYPT_SALT),
    );
    const userDB = await this.prismaService.user.create({
      data: { ...user, password: hashPassword },
    });

    return { data: { ...userDB, password: hashPassword } };
  }

  public async login(
    data: Prisma.UserUpdateInput,
  ): Promise<IResponse<ITokensPair>> {
    const { access, refresh } = await this.generateTokensPair(data);
    return {
      data: { access, refresh },
    };
  }

  private generateTokensPair(payload: Prisma.UserUpdateInput): ITokensPair {
    const access = this.jwtService.sign(payload, {
      secret: mainConfig.EXPIRES_ACCESS_TOKEN,
      expiresIn: mainConfig.EXPIRES_ACCESS_TOKEN,
    });

    const refresh = this.jwtService.sign(payload, {
      secret: mainConfig.SECRET_KEY_REFRESH_TOKEN,
      expiresIn: mainConfig.EXPIRES_REFRESH_TOKEN,
    });

    return { refresh, access };
  }

  private verifyToken(token: string, type = JwtTokensPairEnum.ACCESS): User {
    let secretWord = mainConfig.SECRET_KEY_ACCESS_TOKEN;

    if (type === JwtTokensPairEnum.REFRESH) {
      secretWord = mainConfig.SECRET_KEY_REFRESH_TOKEN;
    }

    return this.jwtService.verify(token, { secret: secretWord });
  }

  private saveTokensPair(
    tokens: Prisma.TokenPairCreateInput,
  ): Promise<TokenPair> {
    return this.prismaService.tokenPair.create({ data: tokens });
  }
}
