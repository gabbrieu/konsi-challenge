import { Static, Type } from '@sinclair/typebox';

export const getDataSchema = {
    querystring: Type.Object({
        document: Type.String(),
    }),
    response: {
        200: Type.Array(
            Type.Object({
                numero_beneficio: Type.String(),
                codigo_tipo_beneficio: Type.String(),
            })
        ),
        202: Type.Object({
            message: Type.String(),
        }),
    },
};

export type GetDataQueryStringType = Static<typeof getDataSchema.querystring>;
