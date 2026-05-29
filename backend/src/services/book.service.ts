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
  async findOne(id: string) {
    const book = await this.repo.findOne({
      where: { id },
    });

    if (!book) {
      throw new NotFoundException('Book not found');
    }

    return book;
  }

  // ✏️ UPDATE BOOK
  async update(id: string, data: Partial<Book>) {
    const books = await this.findOne(id);

    Object.assign(books, data);

    return this.repo.save(books);
  }

  // ❌ DELETE BOOK
  async remove(id: string) {
    const books = await this.findOne(id);

    await this.repo.remove(books);

    return {
      message: 'Book deleted',
      id,
    };
  }
}
