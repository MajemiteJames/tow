import {
  MaxLength,
  MinLength,
  IsEmail,
  IsNotEmpty,
  IsNumber,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthCredentialsDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNumber()
  @MinLength(6)
  @MaxLength(6)
  @IsNotEmpty()
  password: string;
}
