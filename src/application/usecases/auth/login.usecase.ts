import {
    IExternalAPILoginResponseDTO,
    ILoginRequestDTO,
    ILoginResponseDTO,
} from '@domain/entities';
import { ILoginUseCase } from '@domain/usecases';
import axios from 'axios';

export class LoginUseCase implements ILoginUseCase {
    async execute(body: ILoginRequestDTO): Promise<ILoginResponseDTO> {
        // ADD TRY CATCH
        const axiosResponse = await axios.post<IExternalAPILoginResponseDTO>(
            process.env.BASE_URL + '/api/v1/token',
            body
        );

        // VERIFY SUCCESS
        const responseData: IExternalAPILoginResponseDTO = axiosResponse.data;

        return { token: responseData.data.token };
    }
}
