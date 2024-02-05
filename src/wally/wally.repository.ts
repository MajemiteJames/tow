import { User } from '../auth/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { WallyDto } from './dto/create-wally.dto';
import { Wally } from './wally.entity';

@EntityRepository(Wally)
export class WallyRepository extends Repository<Wally> {
  async createWally(wallyDto: WallyDto): Promise<Wally> {
    const { name, value, min } = wallyDto;

    const new_wally = this.create({
      name,
      value,
      min,
    });

    await this.save(new_wally);
    return new_wally;
  }
}
