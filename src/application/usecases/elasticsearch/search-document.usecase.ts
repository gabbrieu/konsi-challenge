import { ISearchDocumentUseCase, SearchType } from '@domain/usecases';
import {
    TransportRequestOptions,
    TransportRequestOptionsWithMeta,
    TransportRequestOptionsWithOutMeta,
} from '@elastic/elasticsearch';
import { SearchRequest } from '@elastic/elasticsearch/lib/api/types';
import { Elasticsearch } from '@infrastructure/entities';

export class SearchDocumentUseCase implements ISearchDocumentUseCase {
    constructor(private readonly elasticSearch: Elasticsearch) {}

    async execute<T>(
        params: SearchRequest,
        options?:
            | TransportRequestOptions
            | TransportRequestOptionsWithMeta
            | TransportRequestOptionsWithOutMeta
    ): SearchType<T> {
        return await this.elasticSearch.client.search<T>(params, options);
    }
}
