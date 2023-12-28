import SearchApi from '@elastic/elasticsearch/lib/api/api/search';
import { SearchRequest } from '@elastic/elasticsearch/lib/api/types';

export type SearchType<T> = ReturnType<typeof SearchApi<T>>;

export interface ISearchDocumentUseCase {
    execute<T>(params: SearchRequest): SearchType<T>;
}
