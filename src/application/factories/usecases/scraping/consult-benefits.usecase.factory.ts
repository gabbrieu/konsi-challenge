import { ConsultBenefitsUseCase } from '@application/usecases';
import { IConsultBenefitsUseCase } from '@domain/usecases';

export const makeConsultBenefitsUseCase = (): IConsultBenefitsUseCase => {
    return new ConsultBenefitsUseCase();
};
