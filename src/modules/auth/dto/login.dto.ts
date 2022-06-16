import { IsEmail, IsNotEmpty, IsString, Length, Matches } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';
import { regEx } from '../../user/constants';

export class LoginDto {
  @ApiProperty({
    name: 'email',
    example: 'name@gmail.com',
    uniqueItems: true,
    required: true,
  })
  @IsEmail()
  @IsNotEmpty()
  public email: string;

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
  public password: string;
}
