import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import e from 'express';
import path from 'path';
import { v4 } from 'uuid';
import { mimetypeConstant } from '../constants';

@Injectable()
export class FileUploadInterceptorService {

  public static async fileName(
    req: e.Request,
    file: Express.Multer.File,
    callback: (error: Error | null, filename: string) => void,
  ) {
    const mimetype = path.extname(file.originalname);
    const nameGenerate = `${v4()}${mimetype}`;

    return callback(null, nameGenerate);
  }

  static async fileFilter(
    req: any,
    file: {
      fieldname: string;
      originalname: string;
      encoding: string;
      mimetype: string;
      size: number;
      destination: string;
      filename: string;
      path: string;
      buffer: Buffer;
    },
    callback: (error: Error | null, acceptFile: boolean) => void,
  ) {
    if (
      !mimetypeConstant.photo_mimetype.includes(file.mimetype) ||
      file.size > mimetypeConstant.size_avatar
    ) {
      throw new HttpException(
        'file format must be jpg or png and max size 2 mb',
        HttpStatus.BAD_REQUEST,
      );
    }
    return callback(null, true);
  }
}

export const { fileName, fileFilter } = FileUploadInterceptorService;
