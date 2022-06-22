import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';

import { mainConfig } from '../../configs';
import { TypeFileUploadEnum } from '../../enum/type-file-upload.enum';

@Injectable()
export class S3Service {
  Bucket;
  constructor() {
    this.Bucket = new S3({
      region: mainConfig.S3_REGION,
      accessKeyId: mainConfig.S3_ACCESS_KEY_ID,
      secretAccessKey: mainConfig.S3_SECRET_ACCESS_KEY,
    });
  }

  public async fileUpload(
    file: Express.Multer.File,
    itemType: TypeFileUploadEnum,
  ): Promise<void> {

    const path = this._pathBuilder(file.filename, itemType);

    await this.Bucket.upload({
      Bucket: mainConfig.S3_NAME,
      Key: path,
      Body: file.path,
      ACL: 'public-read',
      ContentType: file.mimetype,
    }).promise();
  }

  private _pathBuilder(name: string, itemType: string): string {
    return `photos/${itemType}/${name}`;
  }
}
