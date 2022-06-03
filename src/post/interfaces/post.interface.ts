import { ICommonFields } from '../../interfaces';

export interface IPost extends ICommonFields {
  title: string;
  userId: number;
  text: string;
}
