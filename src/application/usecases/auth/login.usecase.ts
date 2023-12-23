import {
    IExternalAPILoginResponseDTO,
    ILoginRequestDTO,
    ILoginResponseDTO,
} from '@domain/entities';
import { ILoginUseCase } from '@domain/usecases';
import axios, { AxiosResponse } from 'axios';

export class LoginUseCase implements ILoginUseCase {
    async execute(body: ILoginRequestDTO): Promise<ILoginResponseDTO> {
        const axiosResponse = await axios.post<
            IExternalAPILoginResponseDTO,
            AxiosResponse<IExternalAPILoginResponseDTO>,
            ILoginRequestDTO
        >(process.env.BASE_URL + '/api/v1/token', body);

        const responseData: IExternalAPILoginResponseDTO = axiosResponse.data;

        return { token: responseData.data.token };
    }
}
