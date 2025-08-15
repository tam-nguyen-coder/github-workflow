import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    afterEach(async () => {
        await app.close();
    });

    it('/ (GET)', () => {
        return request(app.getHttpServer())
            .get('/')
            .expect(200)
            .expect((res) => {
                expect(res.text).toContain('Hello from');
            });
    });

    it('/health (GET)', () => {
        return request(app.getHttpServer())
            .get('/health')
            .expect(200)
            .expect((res) => {
                expect(res.body.status).toBe('ok');
                expect(res.body).toHaveProperty('environment');
            });
    });

    it('/environment (GET)', () => {
        return request(app.getHttpServer())
            .get('/environment')
            .expect(200)
            .expect((res) => {
                expect(res.body).toHaveProperty('environment');
                expect(res.body).toHaveProperty('appName');
                expect(res.body).toHaveProperty('features');
            });
    });

    it('/config/nodeEnv (GET)', () => {
        return request(app.getHttpServer())
            .get('/config/nodeEnv')
            .expect(200)
            .expect((res) => {
                expect(res.body.key).toBe('nodeEnv');
                expect(res.body).toHaveProperty('value');
            });
    });

    it('/api/info (GET)', () => {
        return request(app.getHttpServer())
            .get('/api/info')
            .expect(200)
            .expect((res) => {
                expect(res.body).toHaveProperty('message');
                expect(res.body).toHaveProperty('endpoints');
            });
    });
});
