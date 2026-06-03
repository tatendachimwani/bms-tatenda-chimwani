import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './entities/user.entity';
import { Book } from './entities/book.entity';
import { BooksModule } from './modules/book.module';
import { PrismaService } from './prisma/prisma.service';
import { AuthModule } from './modules/auth.module';
import { Post } from './entities/post.entity';
import { PostsModule } from './modules/posts.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'admin123',
      database: 'bms_db',
      entities: [User, Book, Post],
      synchronize: true,
    }),

    BooksModule,
    AuthModule,
    PostsModule,
  ],

  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
