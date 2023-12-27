import { ISearchDocumentUseCase, SearchType } from '@domain/usecases';
import { SearchRequest } from '@elastic/elasticsearch/lib/api/types';
import { Elasticsearch } from '@infrastructure/entities';

export class SearchDocumentUseCase
    extends Elasticsearch
    implements ISearchDocumentUseCase
{
    constructor() {
        super();
    }

    async execute<T>(params: SearchRequest): SearchType<T> {
        return await this.client.search<T>(params);
    }
}
