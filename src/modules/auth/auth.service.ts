import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Prisma, TokenPair, User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import fs from 'fs';
import path from 'path';

import bcrypt from 'bcrypt';
import { IResponse } from '../../interfaces';
import { PrismaService } from '../../core/prisma.service';
import { mainConfig } from '../../configs';
import { JwtTokensPairEnum } from './enum';
import { MainEnum } from '../../enum';
import { UserService } from '../user/user.service';
import { IForgotPassword, IPayload, ITokensPair } from './interfaces';
import { S3Service } from '../s3/s3.service';
import { TypeFileUploadEnum } from '../../enum/type-file-upload.enum';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
    private userService: UserService,
    private s3Service: S3Service,
  ) {}

  public async createUser(
    user: Prisma.UserCreateInput,
    file: Express.Multer.File,
  ): Promise<IResponse<User>> {
    const userExists = await this.userService.getOneByEmailOrPhone({
      email: user.email,
      phone: user.phone,
    });
    if (userExists) {
      throw new HttpException('User is already registered', HttpStatus.FOUND);
    }

    const hashPassword = await bcrypt.hash(
      user.password,
      Number(mainConfig.BCRYPT_SALT),
    );

    if (typeof user.status === 'string') {
      if (user.status === 'false') {
        user.status = !user.status;
      }
      if (user.status.toString() === 'true') {
        user.status = !!user.status;
      }
    }

    try {
      if (file) {
        await this.s3Service.fileUpload(file, TypeFileUploadEnum.USERS);
        const userDB = await this.prismaService.user.create({
          data: {
            ...user,
            password: hashPassword,
            age: Number(user.age),
            avatar: file.filename,
          },
        });

        await fs.unlink(
          path.join(process.cwd(), 'avatars', file.filename),
          (err) => {
            if (err) console.error(err.message);
          },
        );

        return { data: userDB };
      }

      const userDB = await this.prismaService.user.create({
        data: {
          ...user,
          password: hashPassword,
          age: Number(user.age),
        },
      });

      return { data: userDB };
    } catch (e) {
      if (e) console.error(e.message);
    }
  }

  public async login(data: User): Promise<IResponse<ITokensPair>> {
    const { access, refresh } = await this._generateTokensPair(data);

    return {
      data: { access, refresh, userId: data.id },
    };
  }

  public async logout(
    access: string,
  ): Promise<IResponse<MainEnum.SUCCESSFULLY>> {
    const accessVerify = this.verifyToken(access);

    if (!accessVerify) {
      throw new HttpException('Hacker?)', HttpStatus.BAD_REQUEST);
    }

    const tokenDB = await this.prismaService.tokenPair.findUnique({
      where: { access_token: access },
    });

    if (!tokenDB) {
      throw new UnauthorizedException();
    }

    await this.prismaService.tokenPair.delete({
      where: { access_token: access },
    });

    return { data: MainEnum.SUCCESSFULLY };
  }

  public async forgotPassword(
    access_token: string,
    data: IForgotPassword,
  ): Promise<IResponse<MainEnum.SUCCESSFULLY>> {
    if (data.password === data.newPassword) {
      throw new BadRequestException();
    }

    const verifyToken = this.verifyToken(access_token);

    if (!verifyToken) {
      throw new BadRequestException();
    }

    const tokenDataDb = await this.prismaService.tokenPair.findUnique({
      where: { access_token },
    });

    if (!tokenDataDb) {
      throw new BadRequestException();
    }

    const user = await this.userService.getOneByEmailOrPhone({
      email: data.email as string,
    });

    if (!user) {
      throw new BadRequestException();
    }

    const passwordCompare = await bcrypt.compare(
      data.password as string,
      user.password,
    );

    if (!passwordCompare) {
      throw new UnauthorizedException();
    }

    const passwordHashed = await bcrypt.hash(
      data.newPassword,
      Number(mainConfig.BCRYPT_SALT),
    );
    await this.prismaService.user.update({
      where: { id: user.id },
      data: { password: passwordHashed },
    });

    return { data: MainEnum.SUCCESSFULLY };
  }

  public async refresh(refresh_token: string): Promise<IResponse<ITokensPair>> {
    const verifyToken = this.verifyToken(
      refresh_token,
      JwtTokensPairEnum.REFRESH,
    );
    if (!verifyToken) {
      throw new UnauthorizedException();
    }

    const refreshTokenDB = await this.prismaService.tokenPair.findUnique({
      where: { refresh_token },
    });

    if (!refreshTokenDB) {
      throw new UnauthorizedException('hacker?)');
    }

    const generatedTokens = await this._generateTokensPair(verifyToken);
    await this.prismaService.tokenPair.delete({ where: { refresh_token } });

    return { data: generatedTokens };
  }

  private async _generateTokensPair({
    name,
    id,
    role,
    status,
    age,
    login,
  }: IPayload | User): Promise<ITokensPair> {
    const payload = { name, id, role, status, age, login };

    const access = this.jwtService.sign(payload, {
      secret: mainConfig.SECRET_KEY_ACCESS_TOKEN,
      expiresIn: mainConfig.EXPIRES_ACCESS_TOKEN,
    });

    const refresh = this.jwtService.sign(payload, {
      secret: mainConfig.SECRET_KEY_REFRESH_TOKEN,
      expiresIn: mainConfig.EXPIRES_REFRESH_TOKEN,
    });

    await this._saveTokensPair({
      data: {
        access_token: access,
        refresh_token: refresh,
        userId: id,
      },
    });

    return { refresh, access, userId: id };
  }

  public verifyToken(token: string, type = JwtTokensPairEnum.ACCESS): IPayload {
    let secretWord = mainConfig.SECRET_KEY_ACCESS_TOKEN;

    if (type === JwtTokensPairEnum.REFRESH) {
      secretWord = mainConfig.SECRET_KEY_REFRESH_TOKEN;
    }

    return this.jwtService.verify(token, { secret: secretWord });
  }

  private async _saveTokensPair(
    tokens: Prisma.TokenPairCreateArgs,
  ): Promise<TokenPair> {
    return this.prismaService.tokenPair.create(tokens);
  }
}
