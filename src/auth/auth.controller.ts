import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { ApiTags, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  @ApiBody({ type: AuthCredentialsDto })
  @ApiResponse({ status: 201, description: 'User created successfully' })
  signUp(@Body() authCredentialsDto: AuthCredentialsDto): Promise<any> {
    return this.authService.signUp(authCredentialsDto);
  }

  @Post('/signin')
  @ApiBody({ type: AuthCredentialsDto })
  signIn(
    @Body() authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(authCredentialsDto);
  }

  @Post('/create_admin')
  @ApiBody({ type: AuthCredentialsDto })
  @ApiResponse({ status: 201, description: 'User created successfully' })
  createAdmin(@Body() authCredentialsDto: AuthCredentialsDto): Promise<any> {
    return this.authService.createAdmin(authCredentialsDto);
  }
}
