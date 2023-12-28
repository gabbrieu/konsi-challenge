import { ISetDocumentInElsIndexUseCase } from '@domain/usecases';
import {
    TransportRequestOptions,
    TransportRequestOptionsWithMeta,
    TransportRequestOptionsWithOutMeta,
} from '@elastic/elasticsearch';
import {
    IndexRequest,
    WriteResponseBase,
} from '@elastic/elasticsearch/lib/api/types';
import { Elasticsearch } from '@infrastructure/entities';

export class SetDocumentInElsIndexUseCase
    implements ISetDocumentInElsIndexUseCase
{
    constructor(private readonly elasticSearch: Elasticsearch) {}

    async execute<T>(
        params: IndexRequest<T>,
        options?:
            | TransportRequestOptions
            | TransportRequestOptionsWithMeta
            | TransportRequestOptionsWithOutMeta
    ): Promise<WriteResponseBase> {
        const response = await this.elasticSearch.client.index<T>(
            params,
            options
        );

        await this.elasticSearch.client.indices.refresh({
            index: params.index,
        });

        return response;
    }
}
