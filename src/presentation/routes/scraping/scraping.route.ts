import { makeScrapingController } from '@application/factories';
import { ScrapingController } from '@presentation/controllers';
import { getDataSchema } from '@presentation/routes/scraping';
import { AppType } from '@server';
import { HttpStatusCode } from '@utils/enums';
import { ScrapingValidation } from '@validations/scraping';

export async function scrapingRoute(fastify: AppType): Promise<void> {
    const scrapingController: ScrapingController = makeScrapingController();

    fastify
        .get('/get-data', (_, reply) => reply.sendFile('index.html'))
        .get('/scraping', { schema: getDataSchema }, async (req, res) => {
            const response = await scrapingController.getData(
                req.query.document
            );

            if (response === false) {
                res.statusCode = HttpStatusCode.ACCEPTED;
                return {
                    message: 'Document is not indexed and it was sent to queue',
                };
            }

            return response;
        })
        .use('/scraping', ScrapingValidation.validateDocument);
}
