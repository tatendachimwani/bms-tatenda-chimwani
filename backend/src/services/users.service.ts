import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';
import { UpdateStatusDto } from 'src/dto/updateStatusDto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  // 👑 Create admin
  async createAdmin(): Promise<User> {
    return this.usersRepository.save({
      name: 'Admin User',
      email: 'admin@gmail.com',
      password_hash: await bcrypt.hash('admin123', 10),
      role: 'admin',
      status: 'active',
    });
  }

  // 👤 Register user
  async create(userData: Partial<User>): Promise<User> {
    const user = this.usersRepository.create(userData);
    return this.usersRepository.save(user);
  }

  // 🔍 Login helper
  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({
      where: { email },
    });
  }

  // 🔍 Find user by ID
  async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  // 📋 Get all users (without password hash)
  async findAll(): Promise<Partial<User>[]> {
    return this.usersRepository.find({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        status: true,
      },
    });
  }

  // 👥 Pending users
  async getPendingUsers(): Promise<User[]> {
    try {
      return await this.usersRepository.find({
        where: {
          status: 'pending',
        },
      });
    } catch (error: unknown) {
      console.error('PENDING USERS ERROR:', error);

      throw new InternalServerErrorException('Failed to fetch pending users');
    }
  }

  // 🔍 Find users by status
  async findByStatus(status: string): Promise<User[]> {
    return this.usersRepository.find({
      where: { status },
    });
  }

  // 🗑️ Delete user
  async remove(id: number): Promise<User> {
    const user = await this.findOne(id);
    return this.usersRepository.remove(user);
  }

  // ❌ Reject user
  async rejectUser(id: number): Promise<UpdateResult> {
    return this.usersRepository.update(id, {
      status: 'rejected',
    });
  }

  // 🔼 Promote user to admin
  async promoteToAdmin(id: number): Promise<UpdateResult> {
    return this.usersRepository.update(id, {
      role: 'admin',
      status: 'active',
    });
  }

  // ✏️ Update user status
  async updateStatus(id: number, data: UpdateStatusDto): Promise<UpdateResult> {
    return this.usersRepository.update(id, {
      status: data.status,
    });
  }

  // ✏️ Edit user details
  async update(id: number, data: Partial<User>): Promise<User> {
    const user = await this.findOne(id);
    Object.assign(user, data);
    return this.usersRepository.save(user);
  }

  // 🔑 Reset password
  async resetPassword(
    id: number,
    password: string,
  ): Promise<{ message: string }> {
    const hashedPassword = await bcrypt.hash(password, 10);

    await this.usersRepository.update(id, {
      password_hash: hashedPassword,
    });

    return {
      message: 'Password reset successfully',
    };
  }
}
