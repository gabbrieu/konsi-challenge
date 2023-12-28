import {
    IExternalAPIData,
    IExternalAPIGetDocumentDataDTO,
} from '@domain/entities';
import { IConsultBenefitsUseCase } from '@domain/usecases';
import { HttpStatusCode } from '@utils/enums';
import { ApiError } from '@utils/errors';
import axios from 'axios';

export class ConsultBenefitsUseCase implements IConsultBenefitsUseCase {
    async execute(document: string, token: string): Promise<IExternalAPIData> {
        if (!process.env.BASE_URL) {
            throw new ApiError(
                HttpStatusCode.INTERNAL_SERVER_ERROR,
                'Please fill the BASE_URL variable on .env file'
            );
        }

        const axiosResponse = await axios.get<IExternalAPIGetDocumentDataDTO>(
            process.env.BASE_URL +
                `/api/v1/inss/consulta-beneficios?cpf=${document}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        const documentData: IExternalAPIGetDocumentDataDTO = axiosResponse.data;

        if (!documentData.success) {
            throw new ApiError(
                HttpStatusCode.INTERNAL_SERVER_ERROR,
                'Something bad happens when consulting benefits on external API'
            );
        }

        return documentData.data;
    }
}
