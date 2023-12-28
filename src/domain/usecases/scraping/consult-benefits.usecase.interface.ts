import { IExternalAPIData } from '@domain/entities';

export interface IConsultBenefitsUseCase {
    execute(document: string, token: string): Promise<IExternalAPIData>;
}
