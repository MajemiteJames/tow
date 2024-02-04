import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const existingUser = await this.usersRepository.findOneByEmail(
      authCredentialsDto.email,
    );
    if (existingUser) {
      throw new ConflictException('Username already exists');
    }
    this.usersRepository.createUser(authCredentialsDto);
    delete authCredentialsDto.password;
    const payload: JwtPayload = {
      user: authCredentialsDto,
      email: authCredentialsDto.email,
    };
    const accessToken: string = await this.jwtService.sign(payload);
    return { accessToken };
  }

  async signIn(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const { email, password } = authCredentialsDto;
    const user = await this.usersRepository.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      delete user.password;
      const payload: JwtPayload = { user, email };
      const accessToken: string = await this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('Please check your login credentials');
    }
  }

  async createAdmin(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const existingUser = await this.usersRepository.findOneByEmail(
      authCredentialsDto.email,
    );
    if (existingUser) {
      throw new ConflictException('Username already exists');
    }
    this.usersRepository.createAdmin(authCredentialsDto);
    delete authCredentialsDto.password;
    const payload: JwtPayload = {
      user: authCredentialsDto,
      email: authCredentialsDto.email,
    };
    const accessToken: string = await this.jwtService.sign(payload);
    return { accessToken };
  }
}
