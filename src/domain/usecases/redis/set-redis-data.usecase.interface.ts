export interface ISetRedisDataUseCase {
    execute(key: string, value: string): Promise<string | null>;
}
