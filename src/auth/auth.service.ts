import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EmailCredentialsDto } from './dto/auth-emails.dto';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
import { generateOTP } from './otp.utils';
import { MailerService } from '@nestjs-modules/mailer';
import { User } from './user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
    private jwtService: JwtService,
    private readonly mailerService: MailerService,
  ) {}

  async signUpEmail(
    emailCredentialsDto: EmailCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const existingUser = await this.usersRepository.findOneByEmail(
      emailCredentialsDto.email,
    );
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }
    emailCredentialsDto.otp = generateOTP();
    // Send OTP to the user's email
    await this.sendOtpEmail(emailCredentialsDto.email, emailCredentialsDto.otp);
    this.usersRepository.createUser({
      email: emailCredentialsDto.email,
      otp: emailCredentialsDto.otp,
      otp_expiration: new Date(Date.now() + 10 * 60 * 10000),
    });
    const payload: JwtPayload = {
      user: emailCredentialsDto,
      email: emailCredentialsDto.email,
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

  async verifyOtp(email: string, otp: string): Promise<void> {
    const user = await this.usersRepository.findOneByEmail(email);

    if (!user || user.otp !== otp) {
      throw new NotFoundException('Invalid OTP');
    }

    const otp_expired = new Date() > new Date(user.otp_expiration);
    if (otp_expired) throw new NotFoundException('OTP is expired');

    // Clear OTP after successful verification
    user.otp = null;
    await this.usersRepository.updateUser(user);
  }

  private async sendOtpEmail(email: string, otp: string): Promise<void> {
    await this.mailerService.sendMail({
      to: email,
      from: 'noreply@edswot.com',
      subject: 'OTP Verification',
      text: `${otp}`,
      html: `Your OTP for registration is: ${otp}`,
    });
  }

  async deleteOneById(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
