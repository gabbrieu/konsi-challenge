export interface IExternalAPILoginResponseDTO {
    success: boolean;
    data: {
        token: string;
        type: string;
        expiresIn: string;
    };
}

export interface ILoginRequestDTO {
    username: string;
    password: string;
}

export interface ILoginResponseDTO {
    token: string;
}
