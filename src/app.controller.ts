import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('health')
  getHealth() {
    return {
      success: true,
      message: 'API is running',
      data: {
        status: 'ok',
        timestamp: new Date().toISOString(),
        version: '1.0.0',
      },
    };
  }

  @Get('test')
  getTest() {
    return {
      success: true,
      message: 'Test endpoint works without authorization',
      data: {
        message: 'Backend is working correctly!',
        timestamp: new Date().toISOString(),
      },
    };
  }
}
