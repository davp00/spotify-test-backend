import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppModule } from './app.module';
import { DEFAULT_ITEM_LIMIT } from './config';
import { HttpStatus } from '@nestjs/common';

jest.useFakeTimers();

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);

    await appController.onModuleInit();
  });

  describe('root', () => {
    const params = new URLSearchParams();

    it('should throw error on refresh token', async () => {
      await expect(appController.refreshToken(params)).rejects.toThrow();
    });

    it('should return track', async () => {
      const id = '0oEweHsuQagFuqXct9UvBm';

      const result = await appController.getTrack(id);

      expect(result.album).toBeDefined();
      expect(result.id).toEqual(id);
    });

    it('should return error', async () => {
      const result = await appController.getTrack('wrongID');

      expect(result.status).toBeDefined();
      expect(result.message).toEqual('invalid id');
    });

    it('should return a track list with limit 5', async () => {
      const limit = 5;
      const result = await appController.apiSearch({
        q: 'What You Know',
        page: 1,
        limit,
      });

      expect(result.items.length).toEqual(limit);
    });

    it('should return a track list with limit 10', async () => {
      const result = await appController.apiSearch({
        q: 'What You Know',
      });

      expect(result.items.length).toEqual(DEFAULT_ITEM_LIMIT);
    });

    it('should return no search query error', async () => {
      const result = await appController.apiSearch({
        q: '',
      });

      expect(result.status).toEqual(HttpStatus.BAD_REQUEST);
      expect(result.message).toEqual('No search query');
    });
  });

  afterAll(async (done) => {
    await appController.onModuleDestroy();
    done();
  });
});
