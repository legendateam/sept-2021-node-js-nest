import { Injectable } from '@nestjs/common';

import { CrudEnum } from '../enum';
import { CreateUserDto } from './dto';
import { IResponse } from '../interfaces';
import { dateConstant } from '../constants';
import { IUser } from './interfaces';

@Injectable()
export class UserService {
  users: IUser[] = [];
  deletedUsers: IUser[] = [];

  public getAll(): IResponse<IUser[]> {
    return { data: this.users };
  }

  public getOneById(id: number): IResponse<IUser> {
    const user = this.users.find((user) => user.id === id);
    const userWithoutPassword = { ...user };

    delete userWithoutPassword.password;
    return { data: userWithoutPassword };
  }

  public getAllSoftDeletes(): IResponse<IUser[]> {
    return { data: this.deletedUsers };
  }

  public createOne(user: CreateUserDto): IResponse<IUser> {
    const id = new Date().getTime();
    const { generateDate } = dateConstant;

    this.users.push({ ...user, id, createdAt: generateDate });
    delete user.password;
    return { data: { ...user, id, createdAt: generateDate } };
  }

  public updateOne(id: number, user: Partial<CreateUserDto>): IResponse<IUser> {
    const findUser = this.users.find((user) => user.id === id);
    const index = this.users.findIndex((user) => user.id === id);
    const updatedAt = dateConstant.generateDate;

    this.users.splice(index, 1, { ...findUser, ...user, updatedAt });
    return { data: { ...findUser, ...user, updatedAt } };
  }

  public replaceOne(id: number, user: CreateUserDto): IResponse<IUser> {
    const findUser = this.users.find((user) => user.id === id);
    const index = this.users.findIndex((user) => user.id === id);
    const updatedAt = dateConstant.generateDate;

    this.users.splice(index, 1, { ...findUser, ...user, updatedAt });
    delete user.password;
    return { data: { ...findUser, ...user, updatedAt } };
  }

  public deleteOneById(id: number): IResponse<CrudEnum.SUCCESSFULLY> {
    const index = this.users.findIndex((user) => user.id === id);

    this.users.splice(index, 1);
    return { data: CrudEnum.SUCCESSFULLY };
  }

  public softDelete(id: number): IResponse<CrudEnum.SUCCESSFULLY> {
    const index = this.users.findIndex((user) => user.id === id);
    const user = this.users.find((user) => user.id === id);
    const deletedAt = dateConstant.generateDate;

    this.deletedUsers.push({ ...user, deletedAt });
    this.users.splice(index, 1);

    return { data: CrudEnum.SUCCESSFULLY };
  }
}
