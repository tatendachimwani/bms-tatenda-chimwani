import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';

import { BooksService } from '../services/book.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';

type CreateBookDto = Parameters<BooksService['create']>[0];

@ApiTags('Books')
@ApiBearerAuth()
@Controller('books')
@UseGuards(JwtAuthGuard, RolesGuard)
export class BooksController {
  constructor(private readonly bookService: BooksService) {}

  // ✅ GET ALL
  @ApiOperation({ summary: 'Get all books' })
  @Get()
  findAll() {
    return this.bookService.findAll();
  }

  // ✅ GET ONE
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.bookService.findOne(id);
  }

  // ✅ CREATE
  @ApiOperation({ summary: 'Create a new book' })
  @Post()
  @Roles('admin')
  create(@Body() dto: CreateBookDto) {
    return this.bookService.create(dto);
  }

  // ✅ UPDATE
  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: CreateBookDto) {
    return this.bookService.update(id, dto);
  }

  // ✅ DELETE
  @Delete(':id')
  @Roles('admin')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.bookService.remove(id);
  }
}
