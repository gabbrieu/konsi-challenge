import { makeElasticSearchEntity } from '@application/factories/entities';
import { SetDocumentInElsIndexUseCase } from '@application/usecases';
import { ISetDocumentInElsIndexUseCase } from '@domain/usecases';
import { Elasticsearch } from '@infrastructure/entities';

export const makeSetDocumentInElsIndexUseCase =
    (): ISetDocumentInElsIndexUseCase => {
        const elasticSearch: Elasticsearch = makeElasticSearchEntity();

        return new SetDocumentInElsIndexUseCase(elasticSearch);
    };
