import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { AuthService } from './auth.service';

@Injectable()
export class LockUserSchedule {
  constructor(private readonly userService: AuthService) {}

  @Cron(CronExpression.EVERY_DAY_AT_1AM)
  async handleUserLocking() {
    await this.userService.lockUnsubscriedUser();
  }
}
