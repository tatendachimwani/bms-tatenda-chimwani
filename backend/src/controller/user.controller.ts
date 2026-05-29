import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiResponse,
} from '@nestjs/swagger';

import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';

import { UpdateStatusDto } from 'src/dto/updateStatusDto';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

import { UsersService } from '../services/users.service';
import { User } from '../entities/user.entity';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // ➕ Create user
  @Post()
  create(@Body() userData: Partial<User>) {
    return this.usersService.create(userData);
  }

  // 📋 Get all users
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get('status/:status')
  findByStatus(@Param('status') status: string) {
    return this.usersService.findByStatus(status);
  }

  // 👥 Get pending users
  @Get('pending')
  getPendingUsers() {
    return this.usersService.getPendingUsers();
  }

  // 🔍 Get user by ID
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.usersService.findOne(id);
  }

  // ❌ Delete user
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }

  // 🔄 Update status
  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body() dto: UpdateStatusDto) {
    return this.usersService.updateStatus(Number(id), dto);
  }

  @ApiOperation({ summary: 'Reject user' })
  @ApiResponse({ status: 200, description: 'User rejected successfully' })
  @Patch(':id/reject')
  reject(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.rejectUser(id);
  }

  // ✅ Approve / promote user
  @ApiOperation({ summary: 'Approve user (activate account)' })
  @ApiResponse({ status: 200, description: 'User approved successfully' })
  @Patch(':id/approve')
  @Roles('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  approve(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.promoteToAdmin(id);
  }
}
