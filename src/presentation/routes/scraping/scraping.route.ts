import { FastifyInstance } from 'fastify';

export async function scrapingRoute(fastify: FastifyInstance) {
    fastify.get('/', (req, res) => res.send({ hello: 'world' }));
}
