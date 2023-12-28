import { makeRedisEntity } from '@application/factories';
import { SetRedisDataUseCase } from '@application/usecases';
import { ISetRedisDataUseCase } from '@domain/usecases';
import { Redis } from '@infrastructure/entities';

export const makeSetRedisDataUseCase = (): ISetRedisDataUseCase => {
    const redisEntity: Redis = makeRedisEntity();

    return new SetRedisDataUseCase(redisEntity);
};
