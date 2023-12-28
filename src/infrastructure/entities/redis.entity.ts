import { isEmptyObject } from '@utils/general.util';
import {
    RedisClientOptions,
    RedisClientType,
    RedisFunctions,
    RedisModules,
    RedisScripts,
    createClient,
} from 'redis';

export class Redis {
    public client: RedisClientType<RedisModules, RedisFunctions, RedisScripts> =
        {} as RedisClientType<RedisModules, RedisFunctions, RedisScripts>;

    async build(
        options?: RedisClientOptions<RedisModules, RedisFunctions, RedisScripts>
    ): Promise<void> {
        if (!options) {
            options = { url: 'redis://redis:6379' };
        }

        if (isEmptyObject(this.client))
            this.client = await createClient(options).connect();
    }
}
