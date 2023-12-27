import {
    makeSearchDocumentUseCase,
    makeSendMessageToQueueUseCase,
} from '@application/factories';
import { GetDataUseCase } from '@application/usecases';
import {
    ISearchDocumentUseCase,
    ISendMessageToQueueUseCase,
} from '@domain/usecases';

export const makeGetDataUseCase = (): GetDataUseCase => {
    const searchDocumentUseCase: ISearchDocumentUseCase =
        makeSearchDocumentUseCase();
    const sendMessageToQueueUseCase: ISendMessageToQueueUseCase =
        makeSendMessageToQueueUseCase();

    return new GetDataUseCase(searchDocumentUseCase, sendMessageToQueueUseCase);
};
