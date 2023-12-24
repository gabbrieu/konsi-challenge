import { makeScrapingController } from '@application/factories';
import { ScrapingController } from '@presentation/controllers';
import { getDataSchema } from '@presentation/routes/scraping';
import { AppType } from '@server';
import { ScrapingValidation } from '@validations/scraping';

export async function scrapingRoute(fastify: AppType): Promise<void> {
    const scrapingController: ScrapingController = makeScrapingController();

    fastify
        .get('/scraping', { schema: getDataSchema }, req =>
            scrapingController.getData(
                req.query.document,
                req.headers.authorization
            )
        )
        .addHook('onRequest', ScrapingValidation.validateDocument)
        .addHook('onRequest', ScrapingValidation.checkToken);
}
