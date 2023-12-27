export interface ISendMessageToQueueUseCase {
    execute(message: any): Promise<void>;
}
