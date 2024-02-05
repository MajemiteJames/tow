// profile.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ProfileService } from './profile.service';
import { Profile } from './profile.entity';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/user.entity';
import { ProfileDto } from './dto/create-profile.dto';
import { Logger } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiBody } from '@nestjs/swagger';

@ApiTags('Profile Endpoint')
@ApiBearerAuth()
@Controller('profiles')
@UseGuards(AuthGuard())
export class ProfileController {
  private logger = new Logger('ServiceController');
  constructor(private profileService: ProfileService) {}

  @Post('create')
  @ApiBody({ type: ProfileDto })
  create(
    @Body() profileDto: ProfileDto,
    @GetUser() user: User,
  ): Promise<Profile> {
    this.logger.verbose(
      `User "${user.lastname}" creating a new Service. Data: ${JSON.stringify(
        profileDto,
      )}`,
    );
    return this.profileService.createProfile(profileDto, user);
  }

  @Get(':id')
  findById(@Param('id') id: string): Promise<Profile> {
    return this.profileService.findById(id);
  }

  @Get('user/:userId')
  findByUserId(@Param('userId') userId: string): Promise<Profile> {
    return this.profileService.findByUserId(userId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() profile: Profile): Promise<Profile> {
    return this.profileService.update(id, profile);
  }
}
