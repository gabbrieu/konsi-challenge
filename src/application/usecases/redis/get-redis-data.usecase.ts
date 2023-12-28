import { IGetRedisDataUseCase } from '@domain/usecases';
import { Redis } from '@infrastructure/entities';

export class GetRedisDataUseCase implements IGetRedisDataUseCase {
    constructor(private readonly redis: Redis) {}

    async execute(value: any): Promise<string | null> {
        await this.redis.build();

        return await this.redis.client.get(value);
    }
}
