import { ApiProperty } from '@nestjs/swagger';

import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Min,
} from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({
    required: true,
    name: 'name',
    minLength: 2,
    maxLength: 250,
  })
  @IsNotEmpty()
  @Length(2, 250)
  public name: string;

  @ApiProperty({
    required: true,
    name: 'content',
    minLength: 3,
    maxLength: 2250,
  })
  @IsString()
  @IsNotEmpty()
  @Length(3, 2250)
  public content: string;

  @ApiProperty({
    required: false,
    name: 'published',
  })
  @IsBoolean()
  @IsNotEmpty()
  @IsOptional()
  public published?: boolean;

  @ApiProperty({
    required: false,
    name: 'postId',
    readOnly: true,
  })
  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  @Min(1)
  public readonly postId?: number;

  @ApiProperty({
    required: false,
    name: 'userId',
    readOnly: true,
  })
  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  @Min(1)
  public readonly userId?: number;
}
