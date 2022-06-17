import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Matches,
  Min,
} from 'class-validator';
import { regEx } from '../constants/regEx.constant';

export class CreatePostDto {
  @ApiProperty({
    required: true,
    name: 'title',
    minLength: 4,
    maxLength: 50,
  })
  @IsNotEmpty()
  @IsString()
  @Length(4, 50, { message: 'title length min 4 and max 25' })
  @Matches(regEx.title, {
    message: 'title must be without symbols "^()#@!$%^&*_+=<>"',
  })
  public title: string;

  @ApiProperty({
    required: true,
    name: 'text',
    minLength: 4,
    maxLength: 1000,
  })
  @IsString()
  @IsNotEmpty()
  @Length(6, 1000)
  public text: string;

  @ApiProperty({
    required: false,
    name: 'authorId',
    description: 'author id',
    minimum: 1,
  })
  @IsNumber()
  @IsOptional()
  @Min(1, { message: 'cannot be above 0' })
  public authorId?: number;

  @ApiProperty({
    required: false,
    default: false,
  })
  @IsOptional()
  @IsBoolean()
  public published?: boolean;
}
