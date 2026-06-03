import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Patch,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { Roles } from 'src/common/decorators/roles.decorator';
import { AdminService } from 'src/services/admin.service';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { Book } from '../entities/book.entity';

@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('users')
  findAllUsers() {
    return this.adminService.getUsers();
  }

  @Patch('user/approve/:id')
  async approveUser(@Param('id', ParseIntPipe) id: number) {
    return this.adminService.approveUser(id);
  }

  @Patch('user/promote/:id')
  async promoteUser(@Param('id', ParseIntPipe) id: number) {
    return this.adminService.promoteUser(id);
  }

  @Delete('user/:id')
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.adminService.deleteUser(id);
  }

  @Get('book')
  findAllBooks() {
    return this.adminService.getBooks();
  }

  @Post('book')
  createBook(@Body() body: Partial<Book>) {
    return this.adminService.createBook(body);
  }

  @Delete('book/:id')
  deleteBook(@Param('id', ParseIntPipe) id: number) {
    return this.adminService.deleteBook(id);
  }

  @Patch('book/:id')
  async updateBook(
    @Param('id', ParseIntPipe)
    id: number,
    @Body() body: Partial<Book>,
  ) {
    return this.adminService.updateBook(id, body);
  }
}
