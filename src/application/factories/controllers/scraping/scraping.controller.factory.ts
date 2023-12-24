import { makeGetDataUseCase } from '@application/factories';
import { GetDataUseCase } from '@application/usecases';
import { ScrapingController } from '@presentation/controllers';

export const makeScrapingController = (): ScrapingController => {
    const getDataUseCase: GetDataUseCase = makeGetDataUseCase();

    return new ScrapingController(getDataUseCase);
};
