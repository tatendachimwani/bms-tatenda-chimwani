import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from '../entities/user.entity';

type SafeUser = Omit<User, 'password_hash'>;

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  // 🟢 REGISTER USER
  async register(
    name: string,
    email: string,
    password_hash: string,
  ): Promise<{ user: SafeUser; token: string }> {
    const existingUser = await this.usersService.findByEmail(email);

    if (existingUser) {
      throw new BadRequestException('User already exists');
    }

    // 🔐 HASH PASSWORD
    const hashedPassword = await bcrypt.hash(password_hash, 10);

    const user = await this.usersService.create({
      name,
      email,
      password_hash: hashedPassword,
      role: 'user',
      status: 'pending',
    });

    return {
      user: this.sanitizeUser(user),
      token: this.generateToken(user),
    };
  }

  // 🔵 LOGIN USER
  async login(
    email: string,
    password: string,
  ): Promise<{ user: any; token: string }> {
    const user = await this.usersService.findByEmail(email);

    console.log('EMAIL INPUT:', email);
    console.log('PASSWORD INPUT:', password);
    console.log('FULL USER:', user);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // 🚫 BLOCK UNAPPROVED USERS
    if (user.status === 'pending') {
      throw new UnauthorizedException('Pending admin approval');
    }

    if (user.status === 'rejected') {
      throw new UnauthorizedException('Account has been rejected');
    }

    // 🔐 CHECK PASSWORD
    const isPasswordValid = await bcrypt.compare(
      password,
      String(user.password_hash),
    );
    console.log('PASSWORD MATCH:', isPasswordValid);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return {
      user: this.sanitizeUser(user),
      token: this.generateToken(user),
    };
  }

  // 🔐 GENERATE JWT
  private generateToken(user: User): string {
    return this.jwtService.sign({
      sub: user.id,
      email: user.email,
      role: user.role,
    });
  }

  // 🧼 REMOVE PASSWORD BEFORE RETURNING USER
  private sanitizeUser(user: User): SafeUser {
    const { password_hash, ...safeUser } = user;
    void password_hash;

    return safeUser;
  }
}
