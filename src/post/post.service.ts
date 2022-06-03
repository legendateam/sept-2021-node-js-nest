import { Injectable } from '@nestjs/common';

import { CreatePostDto } from './dto';
import { IResponse } from '../interfaces';
import { IPost } from './interfaces/post.interface';
import { UpdatePostDto } from './dto/update-post.dto';
import { dateConstant } from '../constants';

@Injectable()
export class PostService {
  post: IPost[] = [];
  softDeletePost: IPost[] = [];

  public getAll(): IResponse<IPost[]> {
    return { data: this.post };
  }

  public getAllSoftDelete(): IResponse<IPost[]> {
    return { data: this.softDeletePost };
  }

  public getOneById(id: number): IResponse<IPost> {
    const post = this.post.find((post) => post.id === id);
    return { data: post };
  }

  public createPost(post: CreatePostDto): IResponse<IPost> {
    const id = new Date().getTime();
    const { generateDate } = dateConstant;

    this.post.push({ ...post, id, createdAt: generateDate });
    return { data: { ...post, id, createdAt: generateDate } };
  }

  public updateOne(id: number, post: Partial<UpdatePostDto>): IResponse<IPost> {
    const findPost = this.post.find((post) => post.id === id);
    const index = this.post.findIndex((post) => post.id === id);
    const { generateDate } = dateConstant;

    this.post.splice(index, 1, {
      ...findPost,
      ...post,
      updatedAt: generateDate,
    });

    return { data: { ...post, ...findPost, updatedAt: generateDate } };
  }

  public replaceOne(id: number, post: CreatePostDto): IResponse<IPost> {
    const findPost = this.post.find((post) => post.id === id);
    const index = this.post.findIndex((post) => post.id === id);
    const { generateDate } = dateConstant;

    this.post.splice(index, 1, {
      ...findPost,
      ...post,
      updatedAt: generateDate,
    });

    return { data: { ...findPost, ...post, updatedAt: generateDate } };
  }

  public deleteOne(id: number): void {
    const index = this.post.findIndex((post) => post.id === id);
    this.post.splice(index, 1);
  }

  public softDeleteOne(id: number): void {
    const find = this.post.find((post) => post.id === id);
    const { generateDate } = dateConstant;
    const index = this.post.findIndex((post) => post.id === id);

    find.deletedAt = generateDate;
    this.softDeletePost.push(find);
    this.post.splice(index, 1);
  }
}
