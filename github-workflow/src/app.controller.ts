import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('env')
  getEnvironmentInfo(): any {
    return this.appService.getEnvironmentInfo();
  }

  @Get('health')
  getHealth(): any {
    return {
      status: 'OK',
      environment: process.env.NODE_ENV || 'development',
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    };
  }
}
