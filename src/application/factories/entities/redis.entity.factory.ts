import { Redis } from '@infrastructure/entities';

export const makeRedisEntity = (): Redis => {
    const redis = new Redis();

    return redis;
};
