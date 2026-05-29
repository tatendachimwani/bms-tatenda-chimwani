import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Patch,
  UseGuards,
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
  async approveUser(@Param('id') id: number) {
    return this.adminService.approveUser(id);
  }

  @Patch('user/promote/:id')
  async promoteUser(@Param('id') id: number) {
    return this.adminService.promoteUser(id);
  }

  @Delete('user/:id')
  async deleteUser(@Param('id') id: number) {
    return this.adminService.deleteUser(id);
  }

  @Get('books')
  findAllBooks() {
    return this.adminService.getBooks();
  }

  @Post('book')
  createBook(@Body() body: Partial<Book>) {
    return this.adminService.createBook(body);
  }

  @Delete('book/:id')
  async deleteBook(@Param('id') id: string) {
    return this.adminService.deleteBook(id);
  }

  @Patch('book/:id')
  async updateBook(@Param('id') id: string, @Body() body: Partial<Book>) {
    return this.adminService.updateBook(id, body);
  }
}
