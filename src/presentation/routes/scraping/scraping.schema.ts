import { Static, Type } from '@sinclair/typebox';

export const getDataSchema = {
    querystring: Type.Object({
        document: Type.String(),
    }),
    response: {
        200: Type.Object({
            token: Type.String(),
        }),
    },
};

export type GetDataQueryStringType = Static<typeof getDataSchema.querystring>;
