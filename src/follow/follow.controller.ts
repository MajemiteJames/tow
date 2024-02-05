import { Controller, Post, Param } from '@nestjs/common';
import { FollowService } from './follow.service';

@Controller('follow')
export class FollowController {
  constructor(private readonly userService: FollowService) {}

  @Post(':userId/follow/:followId')
  async followUser(
    @Param('userId') userId: string,
    @Param('followId') followId: string,
  ) {
    return this.userService.followUser(userId, followId);
  }
}
