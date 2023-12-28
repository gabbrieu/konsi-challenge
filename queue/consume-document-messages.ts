import { makeConsumeDocumentMessagesUseCase } from '@application/factories';
import { IConsumeDocumentMessagesUseCase } from '@domain/usecases';

async function consumeDocumentMessages(): Promise<void> {
    const consumeDocumentMessagesUseCase: IConsumeDocumentMessagesUseCase =
        makeConsumeDocumentMessagesUseCase();

    await consumeDocumentMessagesUseCase.execute();
}

consumeDocumentMessages();
