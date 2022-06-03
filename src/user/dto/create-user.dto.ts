import { IUser } from '../interfaces';

export class CreateUserDto implements IUser {
  public status: boolean;
  public age: number;
  public name: string;
  public login: string;
  public email: string;
  public phone: string;
  public password: string;
}
