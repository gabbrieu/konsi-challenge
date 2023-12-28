import { Client } from '@elastic/elasticsearch';

export class Elasticsearch {
    public client: Client = {} as Client;

    build(): void {
        this.client = new Client({
            node: 'http://elasticsearch:9200',
        });
    }
}
