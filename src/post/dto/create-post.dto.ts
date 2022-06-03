import { IPost } from '../interfaces/post.interface';

export class CreatePostDto implements IPost {
  public text: string;
  public title: string;
  public userId: number;
}
