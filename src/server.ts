import { routes } from '@presentation/routes';
import Fastify from 'fastify';

const app = Fastify({
    logger: true,
});

for (const route of routes) {
    app.register(route, { prefix: '/scraping' });
}

const start = async (): Promise<void> => {
    try {
        await app.listen({
            port: Number(process.env.PORT) || 3000,
            host: '0.0.0.0',
        });
    } catch (err) {
        app.log.error(err);
        process.exit(1);
    }
};
start();

export type AppType = typeof app;
