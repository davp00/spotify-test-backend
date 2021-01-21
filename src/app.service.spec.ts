import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';

describe('AppService', () => {
  let service: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [AppService],
    }).compile();

    service = app.get<AppService>(AppService);
  });

  it('should be defined', () => {
    return expect(service).toBeDefined();
  });

  it('formatDuration should return hours format ', function () {
    const result = service.formatDuration(1000 * 60 * 120);
    expect(result).toMatch(/^[0-9]*:[0-9]{2}:[0-9]{2}$/i);
  });
});
