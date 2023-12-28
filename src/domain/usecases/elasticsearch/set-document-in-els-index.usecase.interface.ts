import {
    TransportRequestOptions,
    TransportRequestOptionsWithMeta,
    TransportRequestOptionsWithOutMeta,
} from '@elastic/elasticsearch';
import {
    IndexRequest,
    WriteResponseBase,
} from '@elastic/elasticsearch/lib/api/types';

export interface ISetDocumentInElsIndexUseCase {
    execute<T>(
        params: IndexRequest<T>,
        options?:
            | TransportRequestOptions
            | TransportRequestOptionsWithMeta
            | TransportRequestOptionsWithOutMeta
    ): Promise<WriteResponseBase>;
}
