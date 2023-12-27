import { IBenefits } from '@domain/entities';

export interface IGetDataUseCase {
    execute(document: string): Promise<IBenefits[] | false>;
}
