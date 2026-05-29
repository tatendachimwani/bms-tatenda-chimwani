import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
  async createAdmin() {
    return this.usersRepository.save({
      name: 'Admin User',
      email: 'admin@gmail.com',
      password_hash: await bcrypt.hash('admin123', 10),
      role: 'admin',
      status: 'active',
    });
  }

  // 👤 Register user
  async create(userData: Partial<User>) {
    const user = this.usersRepository.create(userData);
    return this.usersRepository.save(user);
  }

  // 🔍 Login helper
  async findByEmail(email: string) {
    return this.usersRepository.findOne({
      where: { email },
    });
  }

  // 🔍 Find user by ID (✅ FIXED)
  async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  // 📋 ALL USERS
  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  // 👥 PENDING USERS
  async getPendingUsers(): Promise<User[]> {
    try {
      const users = await this.usersRepository.find({
        where: {
          status: 'pending',
        },
      });

      return users;
    } catch (error) {
      console.log('PENDING USERS ERROR:', error);
      throw error;
    }
  }

  // 🗑️ Delete (✅ FIXED)
  async remove(id: number) {
    const user = await this.findOne(id);
    return this.usersRepository.remove(user);
  }

  rejectUser(id: number) {
    return this.usersRepository.update(id, { status: 'rejected' });
  }

  async findByStatus(status: string) {
    return this.usersRepository.find({
      where: { status },
    });
  }

  // 🔼 Promote (✅ FIXED)
  async promoteToAdmin(id: number) {
    return this.usersRepository.update(id, {
      role: 'admin',
    });
  }

  // ✏️ Update status (✅ FIXED)
  async updateStatus(id: number, data: UpdateStatusDto) {
    return this.usersRepository.update(id, {
      status: data.status,
    });
  }
}
