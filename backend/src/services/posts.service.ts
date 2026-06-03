import { Injectable, NotFoundException } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Post } from '../entities/post.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postRepo: Repository<Post>,
  ) {}

  async findAll() {
    return this.postRepo.find({
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findOne(id: number) {
    const post = await this.postRepo.findOne({
      where: { id },
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    return post;
  }

  async create(data: Partial<Post>) {
    const post = this.postRepo.create(data);

    return this.postRepo.save(post);
  }

  async update(id: number, data: Partial<Post>) {
    const post = await this.findOne(id);

    Object.assign(post, data);

    return this.postRepo.save(post);
  }

  async remove(id: number) {
    const post = await this.findOne(id);

    await this.postRepo.remove(post);

    return {
      message: 'Post deleted',
      id,
    };
  }
}
