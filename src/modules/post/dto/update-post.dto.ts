import { ApiProperty } from '@nestjs/swagger';

import {
  IsBoolean,
  IsOptional,
  IsString,
  Length,
  Matches,
} from 'class-validator';
import { regEx } from '../constants/regEx.constant';

export class UpdatePostDto {
  @ApiProperty({
    required: false,
    name: `title`,
    minLength: 4,
    maxLength: 50,
  })
  @IsString()
  @Length(4, 50, { message: 'title length min 4 and max 25' })
  @Matches(regEx.title, {
    message: 'title must be without symbols "^()#@!$%^&*_+=<>"',
  })
  public title?: string;

  @ApiProperty({
    required: false,
    name: 'text',
    minLength: 6,
    maxLength: 1000,
  })
  @IsString()
  @Length(6, 1000)
  public text?: string;

  @ApiProperty({
    required: false,
    default: false,
  })
  @IsOptional()
  @IsBoolean()
  public published?: boolean;
}
