import { makeSendMessageToQueueUseCase } from '@application/factories';
import { ISendMessageToQueueUseCase } from '@domain/usecases';
import * as fs from 'fs';

async function checkFirstContainerStartup() {
    const fileExist: boolean = fs.existsSync('./container_already_started');
    if (!fileExist) {
        fs.writeFileSync(
            './container_already_started',
            'container_already_started'
        );
        await sendInitialDocumentsToQueue();
    }
}

async function sendInitialDocumentsToQueue(): Promise<void> {
    const sendMessageToQueueUseCase: ISendMessageToQueueUseCase =
        makeSendMessageToQueueUseCase();

    const fileData: string = fs.readFileSync('./documents.txt', {
        encoding: 'utf-8',
    });
    const documentArr: string[] = fileData.split('\n');

    for (const document of documentArr) {
        await sendMessageToQueueUseCase.execute(document);
    }
    console.info('Initial documents sent succesfully to RabbitMQ!');
}

checkFirstContainerStartup();
