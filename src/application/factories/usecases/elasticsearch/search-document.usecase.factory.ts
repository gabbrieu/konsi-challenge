import { makeElasticSearchEntity } from '@application/factories';
import { SearchDocumentUseCase } from '@application/usecases';
import { ISearchDocumentUseCase } from '@domain/usecases';
import { Elasticsearch } from '@infrastructure/entities';

export const makeSearchDocumentUseCase = (): ISearchDocumentUseCase => {
    const elasticSearch: Elasticsearch = makeElasticSearchEntity();

    return new SearchDocumentUseCase(elasticSearch);
};
