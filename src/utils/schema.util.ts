import Ajv from 'ajv';

export interface ISchema {
    schema: {
        body: Record<string, Object>;
        response: Record<number, Object>;
    };
}

export const schemaCompilers = {
    body: new Ajv({
        removeAdditional: false,
        coerceTypes: false,
        allErrors: true,
    }),
    params: new Ajv({
        removeAdditional: false,
        coerceTypes: true,
        allErrors: true,
    }),
    querystring: new Ajv({
        removeAdditional: false,
        coerceTypes: true,
        allErrors: true,
    }),
    headers: new Ajv({
        removeAdditional: false,
        coerceTypes: true,
        allErrors: true,
    }),
};

export type SchemaCompilersType = 'body' | 'params' | 'querystring' | 'headers';
