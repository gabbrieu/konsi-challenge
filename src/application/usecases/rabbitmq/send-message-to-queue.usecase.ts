import { ISendMessageToQueueUseCase } from '@domain/usecases';
import { RabbitMQ } from '@infrastructure/entities';
import { HttpStatusCode } from '@utils/enums';
import { ApiError } from '@utils/errors';

export class SendMessageToQueueUseCase implements ISendMessageToQueueUseCase {
    async execute(message: any): Promise<void> {
        let rabbitMQ: RabbitMQ | undefined;
        try {
            rabbitMQ = new RabbitMQ();
            await rabbitMQ.build();
            await rabbitMQ.channel.assertQueue(rabbitMQ.queueName);

            this._sendMessageToQueue(rabbitMQ, message);

            await rabbitMQ.channel.close();
        } catch (error) {
            console.error('Error when sending message to queue');
            throw error;
        } finally {
            await rabbitMQ?.connection.close();
        }
    }

    private _sendMessageToQueue(rabbitMQ: RabbitMQ, message: any): void {
        const dataSent: boolean = rabbitMQ.channel.sendToQueue(
            rabbitMQ.queueName,
            Buffer.from(message)
        );

        if (!dataSent) {
            throw new ApiError(
                HttpStatusCode.INTERNAL_SERVER_ERROR,
                `Error while sending the document to queue: ${message}`
            );
        }
    }
}
