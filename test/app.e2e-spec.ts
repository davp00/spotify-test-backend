import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { DEFAULT_ITEM_LIMIT } from '../src/config';

jest.useFakeTimers();

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/search?q=What you know (GET)', (done) => {
    return request(app.getHttpServer())
      .get('/search?q=What you know')
      .expect(HttpStatus.OK)
      .expect((res) => {
        expect(res.body.total).toBeDefined();
        expect(res.body.total).toEqual(expect.any(Number));
        expect(res.body.items.length).toBe(DEFAULT_ITEM_LIMIT);
      })
      .end(() => done());
  });

  it('/track/:id (GET)', (done) => {
    const id = '0oEweHsuQagFuqXct9UvBm';

    return request(app.getHttpServer())
      .get(`/track/${id}`)
      .expect(HttpStatus.OK)
      .expect((res) => {
        expect(res.body.name).toEqual('What You Know');
        expect(res.body.id).toEqual(id);
      })
      .end(() => done());
  });

  afterAll(async (done) => {
    clearInterval();
    await Promise.all([app.close()]);
    done();
  });
});
