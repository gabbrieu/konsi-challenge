import { LoginUseCase } from '@application/usecases';
import { ILoginUseCase } from '@domain/usecases';

export const makeLoginUseCase = (): ILoginUseCase => {
    return new LoginUseCase();
};
