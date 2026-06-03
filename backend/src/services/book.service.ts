import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Book } from '../entities/book.entity';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private repo: Repository<Book>,
  ) {}

  // 📚 GET ALL BOOKS
  findAll() {
    return this.repo.find();
  }

  // ➕ CREATE BOOK
  create(data: Partial<Book>) {
    const book = this.repo.create(data);
    return this.repo.save(book);
  }

  // 📖 GET ONE BOOK
  async findOne(id: number) {
    const book = await this.repo.findOne({
      where: { id },
    });

    if (!book) {
      throw new NotFoundException('Book not found');
    }

    return book;
  }

  // ✏️ UPDATE BOOK
  async update(id: number, data: Partial<Book>) {
    const book = await this.findOne(id);

    Object.assign(book, data);

    return this.repo.save(book);
  }

  // ❌ DELETE BOOK
  async remove(id: number) {
    const book = await this.findOne(id);

    await this.repo.remove(book);

    return {
      message: 'Book deleted',
      id,
    };
  }
}
