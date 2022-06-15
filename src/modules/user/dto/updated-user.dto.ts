import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Matches,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { regEx } from '../constants';
import { RoleEnum } from '../enum';

export class UpdatedUserDto {
  @IsOptional()
  @ApiProperty({
    required: false,
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
  public name?: string;

  @ApiProperty({ enum: RoleEnum, required: false, default: RoleEnum.USER })
  @IsOptional()
  @IsEnum(RoleEnum)
  public role?: RoleEnum;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  public status?: boolean;
}
