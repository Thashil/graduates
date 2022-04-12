import { Test, TestingModule } from '@nestjs/testing';
import { ShortsRepository } from './ApiShortsRepository.repository';
import { PrismaService } from '@graduates/api/shared/services/prisma/data-access';
import { Short } from '@graduates/api/shorts/api/shared/entities/data-access';

jest.mock('@graduates/api/shorts/api/shared/entities/data-access');

const shortMock: jest.Mocked<Short> = new Short() as Short;

// Run `yarn test api-shorts-repository-data-access`
describe('ShortsRepository', () => {
  let repository: ShortsRepository;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShortsRepository, PrismaService],
    }).compile();

    prisma = module.get<PrismaService>(PrismaService);
    repository = module.get<ShortsRepository>(ShortsRepository);
  });
  it('should be defined', () => {
    expect(prisma).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe('findAll', () => {
    const result = [shortMock];
    it('should return an array of shorts', async () => {
      jest
        .spyOn(repository, 'findAll')
        .mockImplementation((): Promise<Short[]> => Promise.resolve(result));

      expect(await repository.findAll()).toEqual(
        expect.arrayContaining(result)
      );
    });

    it('should return an empty array', async () => {
      expect(await repository.findAll()).toEqual([]);
    });
  });

  describe('findById', () => {
    it('should return a short', async () => {
      jest
        .spyOn(repository, 'findById')
        .mockImplementation((): Promise<Short> => Promise.resolve(shortMock));

      expect(await repository.findById('1')).toMatchObject(shortMock);
    });

    it('should return null', async () => {
      expect(await repository.findById('1')).toEqual(null);
    });
  });

  describe('findByUser', () => {
    it('should return null', async () => {
      expect(await repository.findByUser('1')).toEqual(null);
    });
  });

  describe('findByTag', () => {
    it('should return null', async () => {
      expect(await repository.findByTag('1')).toEqual(null);
    });
  });

  describe('createShort', () => {
    it('should return a short', async () => {
      jest
        .spyOn(repository, 'createShort')
        .mockImplementation((): Promise<Short> => Promise.resolve(shortMock));

      expect(await repository.createShort(shortMock, '1')).toMatchObject(
        shortMock
      );
    });
  });
});
