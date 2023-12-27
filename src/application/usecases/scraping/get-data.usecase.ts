import { IBenefits, IExternalAPIData } from '@domain/entities';
import { IGetDataUseCase, ISearchDocumentUseCase } from '@domain/usecases';
import { HttpStatusCode } from '@utils/enums';
import { ApiError } from '@utils/errors';

export class GetDataUseCase implements IGetDataUseCase {
    constructor(
        private readonly searchDocumentUseCase: ISearchDocumentUseCase
    ) {}

    async execute(document: string): Promise<IBenefits[]> {
        try {
            const result = await this.searchDocumentUseCase.execute({
                index: 'documents',
                query: { match: { _id: document } },
            });

            if (result.hits.total === 0) {
                // send to rabbitmq
            }
            const documentData = result.hits.hits[0]
                ._source as IExternalAPIData;

            return documentData.beneficios;
        } catch (error: any) {
            throw new ApiError(
                HttpStatusCode.INTERNAL_SERVER_ERROR,
                error?.message || 'Something went wrong'
            );
        }
    }
}
