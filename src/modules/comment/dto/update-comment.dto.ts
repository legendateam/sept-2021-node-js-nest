import { ApiProperty } from '@nestjs/swagger';

import { IsBoolean, IsOptional, IsString, Length } from 'class-validator';

export class UpdateCommentDto {
  @ApiProperty({
    required: false,
    name: 'published',
  })
  @IsBoolean()
  @IsOptional()
  public published?: boolean;

  @ApiProperty({
    required: false,
    name: 'name',
    minLength: 2,
    maxLength: 250,
  })
  @IsOptional()
  @Length(2, 250)
  public name?: string;

  @ApiProperty({
    required: false,
    name: 'content',
    minLength: 3,
    maxLength: 2250,
  })
  @IsOptional()
  @IsString()
  @Length(3, 2250)
  public content?: string;
}
