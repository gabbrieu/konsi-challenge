import { routes } from '@presentation/routes';
import { SchemaCompilersType, schemaCompilers } from '@utils/schema.util';
import * as Fastify from 'fastify';

const app = Fastify.fastify({
    logger: false,
});

for (const route of routes) {
    app.register(route);
}

app.setValidatorCompiler(req => {
    if (!req.httpPart) {
        throw new Error('Missing httpPart');
    }
    const compiler = schemaCompilers[req.httpPart as SchemaCompilersType];
    if (!compiler) {
        throw new Error(`Missing compiler for ${req.httpPart}`);
    }
    return compiler.compile(req.schema);
});

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
