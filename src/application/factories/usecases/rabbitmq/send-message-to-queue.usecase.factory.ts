import { makeRabbitMQEntity } from '@application/factories';
import { SendMessageToQueueUseCase } from '@application/usecases';
import { ISendMessageToQueueUseCase } from '@domain/usecases';
import { RabbitMQ } from '@infrastructure/entities';

export const makeSendMessageToQueueUseCase = (): ISendMessageToQueueUseCase => {
    const rabbitMQ: RabbitMQ = makeRabbitMQEntity();

    return new SendMessageToQueueUseCase(rabbitMQ);
};
