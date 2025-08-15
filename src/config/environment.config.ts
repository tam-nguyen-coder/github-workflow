export interface EnvironmentConfig {
    nodeEnv: string;
    port: number;
    appName: string;
    appVersion: string;
    apiPrefix: string;
    databaseUrl: string;
    apiSecretKey: string;
    jwtSecret: string;
    externalApiUrl: string;
    cacheTtl: number;
    enableLogging: boolean;
    enableCors: boolean;
    debugMode: boolean;
}

export const getEnvironmentConfig = (): EnvironmentConfig => ({
    nodeEnv: process.env.NODE_ENV || 'development',
    port: parseInt(process.env.PORT, 10) || 3000,
    appName: process.env.APP_NAME || 'GitHub Workflow NestJS API',
    appVersion: process.env.APP_VERSION || '1.0.0',
    apiPrefix: process.env.API_PREFIX || 'api/v1',
    databaseUrl: process.env.DATABASE_URL || 'postgresql://localhost:5432/github_workflow_dev',
    apiSecretKey: process.env.API_SECRET_KEY || 'dev-secret-key-12345',
    jwtSecret: process.env.JWT_SECRET || 'dev-jwt-secret-key',
    externalApiUrl: process.env.EXTERNAL_API_URL || 'https://api.example.com',
    cacheTtl: parseInt(process.env.CACHE_TTL, 10) || 300,
    enableLogging: process.env.ENABLE_LOGGING === 'true' || true,
    enableCors: process.env.ENABLE_CORS === 'true' || true,
    debugMode: process.env.DEBUG_MODE === 'true' || true,
});

// Environment-specific defaults
export const developmentConfig: Partial<EnvironmentConfig> = {
    nodeEnv: 'development',
    port: 3000,
    debugMode: true,
    enableLogging: true,
    apiSecretKey: 'dev-secret-key-12345',
    databaseUrl: 'postgresql://localhost:5432/github_workflow_dev',
    externalApiUrl: 'https://api.dev.example.com',
};

export const productionConfig: Partial<EnvironmentConfig> = {
    nodeEnv: 'production',
    port: 8080,
    debugMode: false,
    enableLogging: true,
    // These should be set via environment variables in production
    apiSecretKey: process.env.API_SECRET_KEY,
    databaseUrl: process.env.DATABASE_URL,
    externalApiUrl: process.env.EXTERNAL_API_URL,
};
