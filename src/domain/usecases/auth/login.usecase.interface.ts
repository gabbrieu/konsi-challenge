import { ILoginRequestDTO, ILoginResponseDTO } from '@domain/entities';

export interface ILoginUseCase {
    execute(body: ILoginRequestDTO): Promise<ILoginResponseDTO>;
}
