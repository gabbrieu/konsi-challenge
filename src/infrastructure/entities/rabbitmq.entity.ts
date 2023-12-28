import { HttpStatusCode } from '@utils/enums';
import { ApiError } from '@utils/errors';
import * as amqp from 'amqplib';

export class RabbitMQ {
    public connection: amqp.Connection = {} as amqp.Connection;
    public channel: amqp.Channel = {} as amqp.Channel;
    public queueName: string;

    constructor() {
        const queueName = process.env.RABBITMQ_QUEUE_NAME;
        if (!queueName) {
            throw new ApiError(
                HttpStatusCode.INTERNAL_SERVER_ERROR,
                'Please provide the RabbitMQ queue name on .env file'
            );
        }
        this.queueName = queueName;
    }

    async build(): Promise<void> {
        const rabbitmqURL: string | undefined = process.env.RABBITMQ_URL;
        if (!rabbitmqURL) {
            throw new Error('Please provide the RabbitMQ URL on .env file');
        }

        this.connection = await amqp.connect(rabbitmqURL);
        this.channel = await this.connection.createChannel();
    }
}
