import { IGetDataUseCase } from '@domain/usecases';

export class ScrapingController {
    constructor(private readonly getDataUseCase: IGetDataUseCase) {}

    async getData(document: string, token: string | undefined) {
        await this.getDataUseCase.execute(document, token as string);
    }
}
