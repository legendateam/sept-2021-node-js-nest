import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Matches,
  Max,
  Min,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { regEx } from '../constants';
import { RoleEnum } from '../enum';

export class ReplaceDataUserDto {
  @ApiProperty({
    required: true,
    minLength: 2,
    maxLength: 25,
    example: 'Dastin',
    description: 'The first litter of the capital letter',
    name: 'name',
  })
  @IsString()
  @IsNotEmpty()
  @Length(2, 25)
  @Matches(regEx.name, {
    message: 'Only English letters and the First litter of the capital',
  })
  public name: string;

  @ApiProperty({
    name: 'age',
    minimum: 12,
    maximum: 250,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(12)
  @Max(250)
  public age: number;

  @ApiProperty({
    name: 'email',
    example: 'name@gmail.com',
    uniqueItems: true,
    required: true,
  })
  @IsEmail()
  @IsNotEmpty()
  public email: string;

  @ApiProperty({
    example:
      '555-5555-555,+48 504 203 260,+48 (12) 504 203 260,' +
      '+48 (12) 504-203-260,+48(12)504203260,+4812504203260,4812504203260',
    required: true,
    maxLength: 18,
    minLength: 10,
    uniqueItems: true,
    name: 'phone',
  })
  @IsString()
  @IsNotEmpty()
  @Length(10, 18)
  @Matches(regEx.phone, {
    message:
      'phone number may starts with "+", but it id not necessary' +
      'suck characters are allowed "()-+" also one space',
  })
  public phone: string;

  @ApiProperty({
    name: 'login',
    required: true,
    example: 'number, letters and valid symbols "_-"',
  })
  @IsString()
  @IsNotEmpty()
  @Length(5, 15)
  @Matches(regEx.login, {
    message: 'login can contain numbers and special characters "_-"',
  })
  public login: string;

  @ApiProperty({
    required: true,
    name: 'status',
  })
  @IsBoolean()
  @IsNotEmpty()
  public status: boolean;

  @ApiProperty({
    readOnly: true,
    required: true,
    description:
      'one number, one lowercase letter and one uppercase, length min 7, max 25',
    example: 'Qwerty12345',
  })
  @IsString()
  @IsNotEmpty()
  @Length(7, 25)
  @Matches(regEx.password, {
    message:
      'The password must have one uppercase letter,' +
      'one lowercase letter and one digit. Length: min 7, max 25',
  })
  public password: string;

  @ApiProperty({ enum: RoleEnum, required: false, default: RoleEnum.USER })
  @IsOptional()
  @IsEnum(RoleEnum)
  @Length(4, 5)
  public role?: RoleEnum;

  @ApiProperty({
    required: false,
    default: null,
    description: 'photo mimetype include image/jpeg image/png image/pjpeg',
    name: 'avatar',
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public avatar?: string;
}