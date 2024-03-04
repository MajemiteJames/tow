import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { EmailCredentialsDto } from './dto/auth-emails.dto';
import { User } from './user.entity';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async createUser(emailCredentialsDto: EmailCredentialsDto): Promise<any> {
    const { email, otp, otp_expiration } = emailCredentialsDto;

    const user = this.create({
      email,
      otp,
      otp_expiration,
    });
    try {
      await this.save(user);
    } catch (error) {
      if (error.code) {
        throw new ConflictException('Email already exists');
      } else {
        throw new InternalServerErrorException(error);
      }
    }
  }

  async findOneByEmail(email: string): Promise<User | undefined> {
    return this.findOne({ email });
  }

  async updateUser(user: User): Promise<User> {
    return this.save(user);
  }
}
