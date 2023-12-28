import { IExternalAPIData, ILoginRequestDTO } from '@domain/entities';
import {
    IConsultBenefitsUseCase,
    IConsumeDocumentMessagesUseCase,
    IGetRedisDataUseCase,
    ILoginUseCase,
    ISetDocumentInElsIndexUseCase,
    ISetRedisDataUseCase,
} from '@domain/usecases';
import { RabbitMQ } from '@infrastructure/entities';
import { HttpStatusCode } from '@utils/enums';
import { ApiError } from '@utils/errors';
import { ConsumeMessage } from 'amqplib';

export class ConsumeDocumentMessagesUseCase
    implements IConsumeDocumentMessagesUseCase
{
    constructor(
        private readonly rabbitMQ: RabbitMQ,
        private readonly getRedisDataUseCase: IGetRedisDataUseCase,
        private readonly setRedisDataUseCase: ISetRedisDataUseCase,
        private readonly getTokenUseCase: ILoginUseCase,
        private readonly consultBenefitsUseCase: IConsultBenefitsUseCase,
        private readonly setDocumentInElsIndex: ISetDocumentInElsIndexUseCase
    ) {}

    async execute(): Promise<void> {
        await this.rabbitMQ.build();

        await this.rabbitMQ.channel.consume(
            this.rabbitMQ.queueName,
            async msg => {
                await this._handleQueueMessage(msg);
            },
            { noAck: true }
        );
    }

    private async _handleQueueMessage(
        msg: ConsumeMessage | null
    ): Promise<void> {
        if (msg) {
            const document: string = msg.content
                .toString()
                .replace(/(\.|-)/g, '');

            const documentDataOnRedis =
                await this.getRedisDataUseCase.execute(document);

            if (!documentDataOnRedis) {
                const loginBody: ILoginRequestDTO = this._getLoginBodyRequest();
                const { token } = await this.getTokenUseCase.execute(loginBody);

                const documentDataOnExternalAPI: IExternalAPIData =
                    await this.consultBenefitsUseCase.execute(document, token);

                await this.setRedisDataUseCase.execute(
                    document,
                    JSON.stringify(documentDataOnExternalAPI)
                );

                await this.setDocumentInElsIndex.execute({
                    id: documentDataOnExternalAPI.cpf,
                    index: 'documents',
                    document: documentDataOnExternalAPI,
                });
            }
            console.info(`[x] Message: ${document} was successfully consumed`);
        }
    }

    private _getLoginBodyRequest(): ILoginRequestDTO {
        if (!process.env.USERNAME || !process.env.PASSWORD) {
            throw new ApiError(
                HttpStatusCode.INTERNAL_SERVER_ERROR,
                'Please fill the USERNAME and PASSWORD variables on .env file'
            );
        }

        return {
            username: process.env.USERNAME,
            password: process.env.PASSWORD,
        } as ILoginRequestDTO;
    }
}
