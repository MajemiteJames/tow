import {
  Body,
  Controller,
  Post,
  Patch,
  UseGuards,
  Param,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import {
  ApiTags,
  ApiResponse,
  ApiBody,
  ApiBearerAuth,
  ApiParam,
  ApiOperation,
} from '@nestjs/swagger';
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
  @ApiOperation({
    summary: 'Create Admin',
    description: 'Create an Admin User',
  })
  @UseGuards(AuthGuard())
  @ApiBody({ type: AuthCredentialsDto })
  createAdmin(
    @Body() authCredentialsDto: AuthCredentialsDto,
    @GetUser() user: User,
  ): Promise<any> {
    return this.authService.createAdmin(authCredentialsDto, user);
  }

  @ApiBearerAuth()
  @Patch('status/:userId')
  @ApiOperation({
    summary: 'Block a User',
    description: 'Block a user',
  })
  @UseGuards(AuthGuard())
  @ApiParam({ name: 'userId', description: 'User ID' })
  updateUserOnboardStatus(
    @GetUser() user: User,
    @Param('userId') userId: string,
  ): Promise<any> {
    return this.authService.blockUser(user, userId);
  }

  @ApiBearerAuth()
  @Patch('subscribe')
  @ApiOperation({
    summary: 'Subscription',
    description: 'Update a User account when they subscribe',
  })
  @UseGuards(AuthGuard())
  updateUserSubscriptionStatus(@GetUser() user: User): Promise<any> {
    return this.authService.subscribe(user);
  }

  @Post('lock-users')
  @ApiOperation({
    summary: 'Lock User',
    description: 'Lock user if they have not subscribed after 10 weeks',
  })
  async lockUsers() {
    await this.authService.lockUnsubscriedUser();
    return { message: 'Users locked after ten weeks successfully' };
  }
}
