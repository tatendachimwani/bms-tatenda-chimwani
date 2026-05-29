import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../entities/user.entity';
import { Book } from '../entities/book.entity';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,

    @InjectRepository(Book)
    private readonly bookRepo: Repository<Book>,
  ) {}

  // =========================
  // 👤 USERS
  // ===========o==============

  getUsers() {
    return this.userRepo.find();
  }

  async approveUser(id: number) {
    const user = await this.userRepo.findOneBy({ id });

    if (!user) throw new NotFoundException('User not found');

    user.status = 'active';

    return this.userRepo.save(user);
  }

  async promoteUser(id: number) {
    const user = await this.userRepo.findOneBy({ id });

    if (!user) throw new NotFoundException('User not found');

    user.role = 'admin';

    return this.userRepo.save(user);
  }

  async deleteUser(id: number) {
    return this.userRepo.delete(id);
  }

  // =========================
  // 📚 BOOKS
  // =========================

  getBooks() {
    return this.bookRepo.find();
  }

  createBook(data: Partial<Book>) {
    const book = this.bookRepo.create(data);
    return this.bookRepo.save(book);
  }

  async updateBook(id: string, data: Partial<Book>) {
    const book = await this.bookRepo.findOneBy({
      id: String(id),
    });

    if (!book) throw new NotFoundException('Book not found');

    Object.assign(book, data);

    return this.bookRepo.save(book);
  }

  deleteBook(id: string) {
    return this.bookRepo.delete(id);
  }
}
