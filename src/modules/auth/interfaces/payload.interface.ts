import { RoleEnum } from '../../user/enum';

export interface IPayload {
  name: string;
  id: number;
  role: RoleEnum;
  status: boolean;
  age: number;
  login: string;
}
