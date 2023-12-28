import { Elasticsearch } from '@infrastructure/entities';

export const makeElasticSearchEntity = (): Elasticsearch => {
    const elasticSearch = new Elasticsearch();
    elasticSearch.build();

    return elasticSearch;
};
