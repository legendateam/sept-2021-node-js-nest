import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { regEx } from '../../user/constants';
import { AuthDto } from './auth.dto';

export class ForgotPasswordDto extends AuthDto {
  @IsString()
  @ApiProperty({
    readOnly: true,
    required: true,
    description: 'one number, one lowercase letter and one uppercase',
    example: 'Qwerty12345',
  })
  @IsString()
  @IsNotEmpty()
  @Length(7, 25)
  @Matches(regEx.password, {
    message:
      'The password must have one uppercase letter,' +
      'one lowercase letter and one digit',
  })
  public newPassword: string;
}
