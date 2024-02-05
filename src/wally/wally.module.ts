import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { WallyService } from './wally.service';
import { WallyController } from './wally.controller';
import { WallyRepository } from './wally.repository';

@Module({
  imports: [TypeOrmModule.forFeature([WallyRepository]), AuthModule],
  providers: [WallyService],
  controllers: [WallyController],
})
export class WallyModule {}
