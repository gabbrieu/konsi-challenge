import { makeAuthController } from '@application/factories';
import { AuthController } from '@presentation/controllers';
import { loginSchema } from '@presentation/routes/auth';
import { AppType } from '@server';

export async function authRoute(fastify: AppType): Promise<void> {
    const authController: AuthController = makeAuthController();

    fastify.post('/auth/login', { schema: loginSchema }, req =>
        authController.login(req.body)
    );
}
