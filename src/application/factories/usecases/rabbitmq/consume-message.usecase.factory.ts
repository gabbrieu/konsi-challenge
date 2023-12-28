import {
    makeConsultBenefitsUseCase,
    makeGetRedisDataUseCase,
    makeLoginUseCase,
    makeSetDocumentInElsIndexUseCase,
    makeSetRedisDataUseCase,
} from '@application/factories';
import { makeRabbitMQEntity } from '@application/factories/entities';
import { ConsumeDocumentMessagesUseCase } from '@application/usecases';
import {
    IConsultBenefitsUseCase,
    IConsumeDocumentMessagesUseCase,
    IGetRedisDataUseCase,
    ILoginUseCase,
    ISetDocumentInElsIndexUseCase,
    ISetRedisDataUseCase,
} from '@domain/usecases';
import { RabbitMQ } from '@infrastructure/entities';

export const makeConsumeDocumentMessagesUseCase =
    (): IConsumeDocumentMessagesUseCase => {
        const rabbitMQEntity: RabbitMQ = makeRabbitMQEntity();
        const getRedisDataUseCase: IGetRedisDataUseCase =
            makeGetRedisDataUseCase();
        const setRedisDataUseCase: ISetRedisDataUseCase =
            makeSetRedisDataUseCase();
        const getTokenUseCase: ILoginUseCase = makeLoginUseCase();
        const consultBenefitsUseCase: IConsultBenefitsUseCase =
            makeConsultBenefitsUseCase();
        const setDocumentInElsIndex: ISetDocumentInElsIndexUseCase =
            makeSetDocumentInElsIndexUseCase();

        return new ConsumeDocumentMessagesUseCase(
            rabbitMQEntity,
            getRedisDataUseCase,
            setRedisDataUseCase,
            getTokenUseCase,
            consultBenefitsUseCase,
            setDocumentInElsIndex
        );
    };
