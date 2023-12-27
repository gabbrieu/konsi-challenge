import { Client } from '@elastic/elasticsearch';
import { HttpStatusCode } from '@utils/enums';
import { ApiError } from '@utils/errors';

export abstract class Elasticsearch {
    protected client: Client;

    constructor() {
        if (
            !process.env.ELASTICSEARCH_USERNAME ||
            !process.env.ELASTICSEARCH_PASSWORD
        ) {
            throw new ApiError(
                HttpStatusCode.INTERNAL_SERVER_ERROR,
                'Please fill the elasticsearch username and password on .env file'
            );
        }

        this.client = new Client({
            node: 'http://elasticsearch:9200',
            auth: {
                username: process.env.ELASTICSEARCH_USERNAME,
                password: process.env.ELASTICSEARCH_PASSWORD,
            },
        });
    }
}
