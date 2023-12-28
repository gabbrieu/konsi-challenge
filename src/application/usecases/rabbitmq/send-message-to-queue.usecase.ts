import { ISendMessageToQueueUseCase } from '@domain/usecases';
import { RabbitMQ } from '@infrastructure/entities';
import { HttpStatusCode } from '@utils/enums';
import { ApiError } from '@utils/errors';

export class SendMessageToQueueUseCase implements ISendMessageToQueueUseCase {
    constructor(private readonly rabbitMQ: RabbitMQ) {}

    async execute(message: any): Promise<void> {
        try {
            await this.rabbitMQ.build();
            await this.rabbitMQ.channel.assertQueue(this.rabbitMQ.queueName);

            this._sendMessageToQueue(message);

            await this.rabbitMQ.channel.close();
        } catch (error) {
            console.error('Error when sending message to queue');
            throw error;
        } finally {
            await this.rabbitMQ.connection.close();
        }
    }

    private _sendMessageToQueue(message: any): void {
        const dataSent: boolean = this.rabbitMQ.channel.sendToQueue(
            this.rabbitMQ.queueName,
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
