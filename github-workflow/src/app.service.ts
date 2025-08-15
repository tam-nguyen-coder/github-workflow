import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getEnvironmentInfo(): any {
    return {
      environment: process.env.NODE_ENV || 'development',
      port: process.env.PORT || 3000,
      appName: process.env.APP_NAME || 'GitHub Workflow Demo',
      version: process.env.APP_VERSION || '1.0.0',
      database: process.env.DATABASE_URL ? 'Connected' : 'Not configured',
      apiUrl: process.env.API_URL || 'http://localhost:3000',
      debugMode: process.env.DEBUG === 'true',
      timestamp: new Date().toISOString(),
      deploymentId: process.env.DEPLOYMENT_ID || 'local',
    };
  }
}
