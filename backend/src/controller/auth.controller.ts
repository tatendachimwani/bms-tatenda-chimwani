import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { LoginDto } from '../dto/login.dto';
import { RegisterDto } from 'src/dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // 🟢 REGISTER
  @Post('register')
  async register(@Body() dto: RegisterDto) {
    return this.authService.register(dto.name, dto.email, dto.password);
  }

  // 🔵 LOGIN
  @Post('login')
  login(@Body() dto: LoginDto): Promise<{ user: any; token: string }> {
    return this.authService.login(dto.email, dto.password);
  }
}
