import { Body, Controller, Post, Patch, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { ApiTags, ApiResponse, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { GetUser } from '../auth/get-user.decorator';
import { User } from './user.entity';

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

  @ApiBearerAuth()
  @Post('/create_admin')
  @UseGuards(AuthGuard())
  @ApiBody({ type: AuthCredentialsDto })
  @ApiResponse({ status: 201, description: 'User created successfully' })
  createAdmin(@Body() authCredentialsDto: AuthCredentialsDto): Promise<any> {
    return this.authService.createAdmin(authCredentialsDto);
  }

  @ApiBearerAuth()
  @Patch('status')
  @UseGuards(AuthGuard())
  updateUserOnboardStatus(@GetUser() user: User): Promise<any> {
    return this.authService.blockUser(user);
  }
}
