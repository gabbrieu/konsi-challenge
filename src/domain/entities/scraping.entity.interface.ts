export interface IExternalAPIGetDocumentDataDTO {
    success: boolean;
    data: IExternalAPIData;
}

export interface IExternalAPIData {
    cpf: string;
    beneficios: IBenefits[];
}

export interface IBenefits {
    numero_beneficio: string;
    codigo_tipo_beneficio: string;
}
