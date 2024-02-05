import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../auth/user.entity';
import { Follow } from './follow.entity';
@Injectable()
export class FollowService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Follow)
    private readonly followRepository: Repository<Follow>,
  ) {}

  async followUser(userId: string, followId: string): Promise<void> {
    const follower = await this.userRepository.findOne(userId);
    const following = await this.userRepository.findOne(followId);

    if (!follower || !following) {
      throw new NotFoundException('User not found');
    }

    const follow = new Follow();
    follow.follower = follower;
    follow.following = following;

    await this.followRepository.save(follow);
  }
}
