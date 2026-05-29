import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'BMS API is running';
  }

  getStatus() {
    return {
      status: 'ok',
      message: 'Backend is healthy',
      timestamp: new Date(),
    };
  }
}
