// profile.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from './profile.entity';
import { ProfileDto } from './dto/create-profile.dto';
import { ProfileRepository } from './profile.repository';
import { User } from '../auth/user.entity';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(ProfileRepository)
    private profileRepository: ProfileRepository,
  ) {}

  async createProfile(profile: ProfileDto, user: User): Promise<Profile> {
    return this.profileRepository.createProfile(profile, user);
  }

  async findById(id: string): Promise<Profile> {
    const found = await this.profileRepository.findOne(id);

    if (!found) {
      throw new NotFoundException(`Profile with ID "${id}" not found`);
    }

    return found;
  }

  async findByUserId(userId: string): Promise<Profile> {
    return this.profileRepository.findOne({ where: { user: { id: userId } } });
  }

  async update(id: string, updatedProfile: Partial<Profile>): Promise<Profile> {
    const profile_gotten = await this.profileRepository.findOne(id);
    if (!profile_gotten) {
      throw new Error(`Service with ID ${id} not found`);
    }
    const updated = { ...profile_gotten, ...updatedProfile };
    return this.profileRepository.save(updated);
  }
}
