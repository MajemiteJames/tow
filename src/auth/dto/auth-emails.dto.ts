import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class EmailCredentialsDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  otp: string;

  otp_expiration: Date;
}
