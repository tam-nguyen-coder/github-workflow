import { Controller, Get, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) { }

    @Get()
    getHello(): string {
        return this.appService.getHello();
    }

    @Get('health')
    getHealth() {
        return this.appService.getHealth();
    }

    @Get('environment')
    getEnvironmentInfo() {
        return this.appService.getEnvironmentInfo();
    }

    @Get('config/:key')
    getConfigValue(@Param('key') key: string) {
        return this.appService.getConfigValue(key);
    }

    @Get('api/info')
    getApiInfo() {
        return {
            message: 'GitHub Workflow NestJS API',
            endpoints: [
                { method: 'GET', path: '/', description: 'Welcome message' },
                { method: 'GET', path: '/health', description: 'Health check' },
                { method: 'GET', path: '/environment', description: 'Environment information' },
                { method: 'GET', path: '/config/:key', description: 'Get specific config value' },
                { method: 'GET', path: '/api/info', description: 'API information' },
            ],
            examples: {
                configKeys: ['nodeEnv', 'appName', 'appVersion', 'port', 'debugMode'],
            },
        };
    }
}
