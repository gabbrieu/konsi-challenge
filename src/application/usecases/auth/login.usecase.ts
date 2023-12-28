import {
    IExternalAPILoginResponseDTO,
    ILoginRequestDTO,
    ILoginResponseDTO,
} from '@domain/entities';
import { ILoginUseCase } from '@domain/usecases';
import { HttpStatusCode } from '@utils/enums';
import { ApiError } from '@utils/errors';
import axios from 'axios';

export class LoginUseCase implements ILoginUseCase {
    async execute(body: ILoginRequestDTO): Promise<ILoginResponseDTO> {
        // ADD TRY CATCH
        const axiosResponse = await axios.post<IExternalAPILoginResponseDTO>(
            process.env.BASE_URL + '/api/v1/token',
            body
        );

        const responseData: IExternalAPILoginResponseDTO = axiosResponse.data;

        if (!responseData.success) {
            throw new ApiError(
                HttpStatusCode.UNAUTHORIZED,
                'Error while generating token'
            );
        }

        return { token: responseData.data.token };
    }
}
