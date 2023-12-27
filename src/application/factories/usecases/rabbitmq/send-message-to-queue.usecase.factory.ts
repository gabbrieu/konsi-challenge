import { SendMessageToQueueUseCase } from '@application/usecases';
import { ISendMessageToQueueUseCase } from '@domain/usecases';

export const makeSendMessageToQueueUseCase = (): ISendMessageToQueueUseCase => {
    return new SendMessageToQueueUseCase();
};
