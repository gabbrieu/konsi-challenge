import { ISetRedisDataUseCase } from '@domain/usecases';
import { Redis } from '@infrastructure/entities';

export class SetRedisDataUseCase implements ISetRedisDataUseCase {
    constructor(private readonly redis: Redis) {}

    async execute(key: string, value: string): Promise<string | null> {
        await this.redis.build();

        return await this.redis.client.set(key, value);
    }
}
