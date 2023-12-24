import { IExternalAPIGetDocumentDataDTO } from '@domain/entities';
import { IGetDataUseCase } from '@domain/usecases';
import { HttpStatusCode } from '@utils/enums';
import { ApiError } from '@utils/errors';
import axios from 'axios';

export class GetDataUseCase implements IGetDataUseCase {
    async execute(document: string, token: string): Promise<void> {
        try {
            const axiosResponse =
                await axios.get<IExternalAPIGetDocumentDataDTO>(
                    process.env.BASE_URL +
                        `/api/v1/inss/consulta-beneficios?cpf=${document}`,
                    { headers: { Authorization: token } }
                );
        } catch (error: any) {
            throw new ApiError(
                HttpStatusCode.INTERNAL_SERVER_ERROR,
                error?.message || 'Something went wrong'
            );
        }
    }
}
