import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Param,
  Delete,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { EmailCredentialsDto } from './dto/auth-emails.dto';
import { ApiTags, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  @ApiBody({ type: EmailCredentialsDto })
  @ApiResponse({ status: 201, description: 'User created successfully' })
  signUp(@Body() emailCredentialsDto: EmailCredentialsDto): Promise<any> {
    return this.authService.signUpEmail(emailCredentialsDto);
  }

  @Post('/signin')
  @ApiBody({ type: AuthCredentialsDto })
  signIn(
    @Body() authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(authCredentialsDto);
  }

  @Post('verify/:email')
  @HttpCode(HttpStatus.NO_CONTENT)
  async verifyOtp(
    @Param('email') email: string,
    @Body('otp') otp: string,
  ): Promise<void> {
    await this.authService.verifyOtp(email, otp);
  }

  @Delete(':id')
  async deleteOneById(@Param('id') id: string): Promise<void> {
    await this.authService.deleteOneById(id);
  }
}
