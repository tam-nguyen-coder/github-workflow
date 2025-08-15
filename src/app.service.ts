import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { getEnvironmentConfig, EnvironmentConfig } from './config/environment.config';

@Injectable()
export class AppService {
    private readonly config: EnvironmentConfig;

    constructor(private configService: ConfigService) {
        this.config = getEnvironmentConfig();
    }

    getHello(): string {
        return `Hello from ${this.config.appName} v${this.config.appVersion}!`;
    }

    getEnvironmentInfo() {
        return {
            environment: this.config.nodeEnv,
            appName: this.config.appName,
            appVersion: this.config.appVersion,
            port: this.config.port,
            apiPrefix: this.config.apiPrefix,
            timestamp: new Date().toISOString(),
            features: {
                logging: this.config.enableLogging,
                cors: this.config.enableCors,
                debug: this.config.debugMode,
            },
            external: {
                apiUrl: this.config.externalApiUrl,
                cacheTtl: this.config.cacheTtl,
            },
        };
    }

    getHealth() {
        return {
            status: 'ok',
            environment: this.config.nodeEnv,
            timestamp: new Date().toISOString(),
            uptime: process.uptime(),
            version: this.config.appVersion,
        };
    }

    getConfigValue(key: string) {
        // Safe way to get config values without exposing secrets
        const safeKeys = [
            'nodeEnv',
            'appName',
            'appVersion',
            'port',
            'apiPrefix',
            'enableLogging',
            'enableCors',
            'debugMode',
            'cacheTtl',
        ];

        if (!safeKeys.includes(key)) {
            return {
                error: 'Configuration key not accessible or not found',
                availableKeys: safeKeys,
            };
        }

        return {
            key,
            value: this.config[key],
            environment: this.config.nodeEnv,
        };
    }
}
