import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';

describe('Payments (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/payments (POST)', () => {
    return request(app.getHttpServer())
      .post('/payments')
      .send({ orderId: 'order1', amount: 100 })
      .expect(201)
      .expect((res) => {
        expect(res.body).toHaveProperty('status');
        expect(['APPROVED', 'DECLINED']).toContain(res.body.status);
      });
  });

  it('/payments (GET)', () => {
    return request(app.getHttpServer())
      .get('/payments')
      .expect(200)
      .expect((res) => {
        expect(Array.isArray(res.body)).toBe(true);
      });
  });
});
