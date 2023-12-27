import { IBenefits } from '@domain/entities';
import { IGetDataUseCase } from '@domain/usecases';

export class ScrapingController {
    constructor(private readonly getDataUseCase: IGetDataUseCase) {}

    async getData(document: string): Promise<IBenefits[] | false> {
        return await this.getDataUseCase.execute(document);
    }
}
