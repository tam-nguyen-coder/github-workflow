import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
    let appController: AppController;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            imports: [ConfigModule.forRoot()],
            controllers: [AppController],
            providers: [AppService],
        }).compile();

        appController = app.get<AppController>(AppController);
    });

    describe('root', () => {
        it('should return a hello message', () => {
            const result = appController.getHello();
            expect(result).toContain('Hello from');
        });
    });

    describe('health', () => {
        it('should return health status', () => {
            const result = appController.getHealth();
            expect(result.status).toBe('ok');
            expect(result).toHaveProperty('environment');
            expect(result).toHaveProperty('timestamp');
        });
    });

    describe('environment', () => {
        it('should return environment information', () => {
            const result = appController.getEnvironmentInfo();
            expect(result).toHaveProperty('environment');
            expect(result).toHaveProperty('appName');
            expect(result).toHaveProperty('features');
        });
    });

    describe('config', () => {
        it('should return config value for valid key', () => {
            const result = appController.getConfigValue('nodeEnv');
            expect(result).toHaveProperty('key');
            expect(result).toHaveProperty('value');
        });

        it('should return error for invalid key', () => {
            const result = appController.getConfigValue('invalidKey');
            expect(result).toHaveProperty('error');
        });
    });
});
