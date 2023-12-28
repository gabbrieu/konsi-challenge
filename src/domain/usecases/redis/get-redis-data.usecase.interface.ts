export interface IGetRedisDataUseCase {
    execute(value: any): Promise<string | null>;
}
