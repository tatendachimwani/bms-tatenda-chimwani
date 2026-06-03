import {
  Controller,
  Get,
  Post as HttpPost,
  Put,
  Delete,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';

import { PostsService } from '../services/posts.service';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    return this.postsService.findOne(id);
  }

  @HttpPost()
  create(@Body() body: any) {
    return this.postsService.create(body);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe)
    id: number,
    @Body() body: any,
  ) {
    return this.postsService.update(id, body);
  }

  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    return this.postsService.remove(id);
  }
}
