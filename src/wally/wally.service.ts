import { Injectable, NotFoundException } from '@nestjs/common';
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

  async createProfile(wallyDto: WallyDto, user: User): Promise<Wally> {
    return this.wallyRepository.createWally(wallyDto, user);
  }

  async findById(id: string): Promise<Wally> {
    const found = await this.wallyRepository.findOne(id);

    if (!found) {
      throw new NotFoundException(`Profile with ID "${id}" not found`);
    }

    return found;
  }

  async update(id: string, updatedWally: Partial<Wally>): Promise<Wally> {
    const wally_gotten = await this.wallyRepository.findOne(id);
    if (!wally_gotten) {
      throw new Error(`Service with ID ${id} not found`);
    }
    const updated = { ...wally_gotten, ...updatedWally };
    return this.wallyRepository.save(updated);
  }
}
