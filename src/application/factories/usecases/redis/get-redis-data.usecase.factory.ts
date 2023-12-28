import { makeRedisEntity } from '@application/factories';
import { GetRedisDataUseCase } from '@application/usecases';
import { IGetRedisDataUseCase } from '@domain/usecases';
import { Redis } from '@infrastructure/entities';

export const makeGetRedisDataUseCase = (): IGetRedisDataUseCase => {
    const redisEntity: Redis = makeRedisEntity();

    return new GetRedisDataUseCase(redisEntity);
};
