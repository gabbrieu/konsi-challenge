import { SearchDocumentUseCase } from '@application/usecases';
import { ISearchDocumentUseCase } from '@domain/usecases';

export const makeSearchDocumentUseCase = (): ISearchDocumentUseCase => {
    return new SearchDocumentUseCase();
};
