import { GetDataQueryStringType } from '@presentation/routes/scraping';
import { HttpStatusCode } from '@utils/enums';
import { ApiError } from '@utils/errors';
import { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from 'fastify';

export abstract class ScrapingValidation {
    static validateDocument(
        req: FastifyRequest,
        _: FastifyReply,
        done: HookHandlerDoneFunction
    ): void {
        const query = req.query as GetDataQueryStringType;
        const document: string = query.document;
        const cpfRegex = /^(\d{3}[.]?\d{3}[.]?\d{3}-?\d{2})$/;

        if (!cpfRegex.test(document)) {
            throw new ApiError(HttpStatusCode.BAD_REQUEST, 'CPF malformed');
        }

        (req.query as GetDataQueryStringType).document = document.replace(
            /(\.|-)/g,
            ''
        );

        done();
    }

    static checkToken(
        req: FastifyRequest,
        _: FastifyReply,
        done: HookHandlerDoneFunction
    ): void {
        if (!req.headers.authorization) {
            throw new ApiError(
                HttpStatusCode.UNAUTHORIZED,
                'Token not sent. Please provide a token!'
            );
        }

        done();
    }
}
