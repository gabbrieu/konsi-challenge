import { IBenefits, IExternalAPIData } from '@domain/entities';
import {
    IGetDataUseCase,
    ISearchDocumentUseCase,
    ISendMessageToQueueUseCase,
} from '@domain/usecases';
import { SearchTotalHits } from '@elastic/elasticsearch/lib/api/types';
import { HttpStatusCode } from '@utils/enums';
import { ApiError } from '@utils/errors';
export class GetDataUseCase implements IGetDataUseCase {
    constructor(
        private readonly searchDocumentUseCase: ISearchDocumentUseCase,
        private readonly sendMessageToQueueUseCase: ISendMessageToQueueUseCase
    ) {}

    async execute(document: string): Promise<IBenefits[] | false> {
        try {
            const result = await this.searchDocumentUseCase.execute({
                index: 'documents',
                query: { match: { _id: document } },
            });

            if (
                this._isSearchTotalHits(result.hits.total) &&
                result.hits.total.value === 0
            ) {
                await this.sendMessageToQueueUseCase.execute(document);
                return false;
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

    private _isSearchTotalHits(object: any): object is SearchTotalHits {
        return 'relation' in object && 'value' in object;
    }
}
