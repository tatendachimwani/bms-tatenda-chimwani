import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Book } from '../entities/book.entity';

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'password_hash',
  database: process.env.DB_NAME || 'book_db',

  entities: [User, Book],

  synchronize: true, // ⚠️ disable in production
  logging: false,
};
