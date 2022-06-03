import { ICommonFields } from '../../interfaces';

export interface IUser extends ICommonFields {
  name: string;
  age: number;
  email: string;
  phone: string;
  login: string;
  status: boolean;
  password: string;
}
