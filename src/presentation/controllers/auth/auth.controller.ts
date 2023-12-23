import { ILoginRequestDTO, ILoginResponseDTO } from '@domain/entities';
import { ILoginUseCase } from '@domain/usecases';

export class AuthController {
    constructor(private readonly loginUseCase: ILoginUseCase) {}

    async login(loginDTO: ILoginRequestDTO): Promise<ILoginResponseDTO> {
        return this.loginUseCase.execute(loginDTO);
    }
}
