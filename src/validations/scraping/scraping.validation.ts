import { IncomingMessageExtended, NextFunction } from '@fastify/middie';
import { HttpStatusCode } from '@utils/enums';
import { ApiError } from '@utils/errors';
import * as createServer from 'connect';
import { IncomingMessage } from 'connect';
import { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from 'fastify';
import { ServerResponse } from 'node:http';

export abstract class ScrapingValidation {
    static validateDocument(
        req: createServer.IncomingMessage & IncomingMessageExtended,
        _: ServerResponse<IncomingMessage>,
        next: NextFunction
    ): void {
        const query = req.query;
        const document: string = query.document;
        const cpfRegex = /^(\d{3}[.]?\d{3}[.]?\d{3}-?\d{2})$/;

        if (!cpfRegex.test(document)) {
            throw new ApiError(HttpStatusCode.BAD_REQUEST, 'CPF malformed');
        }

        req.query.document = document.replace(/(\.|-)/g, '');

        next();
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
