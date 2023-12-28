import { RabbitMQ } from '@infrastructure/entities';

export const makeRabbitMQEntity = (): RabbitMQ => {
    const rabbitMQ = new RabbitMQ();

    return rabbitMQ;
};
