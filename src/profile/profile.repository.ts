import { User } from '../auth/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { ProfileDto } from './dto/create-profile.dto';
import { Profile } from './profile.entity';

@EntityRepository(Profile)
export class ProfileRepository extends Repository<Profile> {
  async createProfile(profileDto: ProfileDto, user: User): Promise<Profile> {
    const { tagline, profession, income, company, links, emails } = profileDto;

    const new_profile = this.create({
      tagline,
      profession,
      income,
      company,
      links,
      emails,
      user,
    });

    await this.save(new_profile);
    return new_profile;
  }
}
