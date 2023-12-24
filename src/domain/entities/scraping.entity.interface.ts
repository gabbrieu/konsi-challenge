export interface IExternalAPIGetDocumentDataDTO {
    success: boolean;
    data: {
        cpf: string;
        beneficios: [
            { numero_beneficio: string; codigo_tipo_beneficio: string },
        ];
    };
}
