import { makeSearchDocumentUseCase } from '@application/factories';
import { GetDataUseCase } from '@application/usecases';

export const makeGetDataUseCase = (): GetDataUseCase => {
    const searchDocumentUseCase = makeSearchDocumentUseCase();

    return new GetDataUseCase(searchDocumentUseCase);
};
