import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { WallyService } from './wally.service';
import { Wally } from './wally.entity';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/user.entity';
import { WallyDto } from './dto/create-wally.dto';
import { Logger } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiBody } from '@nestjs/swagger';

@ApiTags('Wally Endpoint')
@ApiBearerAuth()
@Controller('wally')
@UseGuards(AuthGuard())
export class WallyController {
  private logger = new Logger('ServiceController');
  constructor(private wallyService: WallyService) {}

  @Post('create')
  @ApiBody({ type: WallyDto })
  create(@Body() wallyDto: WallyDto, @GetUser() user: User): Promise<Wally> {
    this.logger.verbose(
      `User "${user.lastname}" creating a new Wally. Data: ${JSON.stringify(
        wallyDto,
      )}`,
    );
    return this.wallyService.createProfile(wallyDto, user);
  }

  @Get(':id')
  findById(@Param('id') id: string): Promise<Wally> {
    return this.wallyService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() wally: Wally): Promise<Wally> {
    return this.wallyService.update(id, wally);
  }
}
