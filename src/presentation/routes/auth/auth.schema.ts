import { Type } from '@sinclair/typebox';

export const loginSchema = {
    body: Type.Object({
        username: Type.String(),
        password: Type.String(),
    }),
    response: {
        200: Type.Object({
            token: Type.String(),
        }),
    },
};
