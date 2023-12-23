import { makeAuthController } from '@application/factories';
import { ILoginRequestDTO } from '@domain/entities';
import { AuthController } from '@presentation/controllers';
import { FastifyInstance } from 'fastify';
import { loginSchema } from './auth.schema';

export async function authRoute(fastify: FastifyInstance): Promise<void> {
    const AuthController: AuthController = makeAuthController();

    fastify.post('/auth/login', { schema: loginSchema }, req =>
        AuthController.login(req.body as ILoginRequestDTO)
    );
}
