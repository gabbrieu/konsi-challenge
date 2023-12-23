import { makeLoginUseCase } from '@application/factories';
import { ILoginUseCase } from '@domain/usecases';
import { AuthController } from '@presentation/controllers';

export const makeAuthController = (): AuthController => {
    const loginUseCase: ILoginUseCase = makeLoginUseCase();

    return new AuthController(loginUseCase);
};
