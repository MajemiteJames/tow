import { IsString, IsNotEmpty, IsArray, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ProfileDto {
  @ApiProperty()
  @IsNotEmpty()
  tagline: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  profession: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  income: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  company: string;

  @ApiProperty()
  @IsArray()
  @IsString({ each: true })
  links: string[];

  @ApiProperty()
  @IsArray()
  @IsString({ each: true })
  emails: string[];
}
