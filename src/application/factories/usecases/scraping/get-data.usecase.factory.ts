import { GetDataUseCase } from '@application/usecases';

export const makeGetDataUseCase = (): GetDataUseCase => {
    return new GetDataUseCase();
};
