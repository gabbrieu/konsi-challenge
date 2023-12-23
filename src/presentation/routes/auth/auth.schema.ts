export const loginSchema = {
    body: {
        type: 'object',
        required: ['username', 'password'],
        properties: {
            username: { type: 'string' },
            password: { type: 'string' },
        },
    },
    response: {
        200: {
            type: 'object',
            properties: {
                token: { type: 'string' },
            },
        },
    },
};
