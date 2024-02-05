import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Wally } from './wally.entity';
import { WallyDto } from './dto/create-wally.dto';
import { WallyRepository } from './wally.repository';
import { User } from '../auth/user.entity';

@Injectable()
export class WallyService {
  constructor(
    @InjectRepository(WallyRepository)
    private wallyRepository: WallyRepository,
  ) {}

  async createWally(wallyDto: WallyDto, user: User): Promise<Wally> {
    if (user.isAdmin == false) {
      throw new ConflictException(
        'You are not authorized to perform this function',
      );
    }
    return this.wallyRepository.createWally(wallyDto);
  }

  async findById(id: string): Promise<Wally> {
    const found = await this.wallyRepository.findOne(id);

    if (!found) {
      throw new NotFoundException(`Wally with ID "${id}" not found`);
    }

    return found;
  }

  async update(
    id: string,
    updatedWally: Partial<Wally>,
    user: User,
  ): Promise<Wally> {
    if (user.isAdmin == false) {
      throw new ConflictException(
        'You are not authorized to perform this function',
      );
    }
    const wally_gotten = await this.wallyRepository.findOne(id);
    if (!wally_gotten) {
      throw new Error(`Service with ID ${id} not found`);
    }
    const updated = { ...wally_gotten, ...updatedWally };
    return this.wallyRepository.save(updated);
  }
}
