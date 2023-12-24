export interface IGetDataUseCase {
    execute(document: string, token: string): Promise<void>;
}
