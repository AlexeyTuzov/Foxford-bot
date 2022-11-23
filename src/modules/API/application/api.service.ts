import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import DialogueFactoryService from 'src/modules/NLU/NLU-assets/dialogueFactory/dialogueFactory.service';
import EntryPointService from 'src/modules/NLU/NLU-assets/entryPoint/entryPoint.service';
import IMessage from '../interfaces/message.interface';

@Injectable()
export class ApiService {
	constructor(
		@Inject(CACHE_MANAGER) private cacheManager: Cache,
		private readonly enrtyPointService: EntryPointService,
		private readonly dialogueFactoryService: DialogueFactoryService
	) {}

	async processMessage(messageObj: IMessage): Promise<string> {
		const dialogueId = messageObj.userId;

		const unfinishedDialogue: IMessage = await this.cacheManager.get(
			dialogueId
		);

		console.log('unfinished dialogue:', unfinishedDialogue);

		if (!unfinishedDialogue) {
			const entryPointAnswer = await this.enrtyPointService.analyze(messageObj);
			return entryPointAnswer.answer;
		} else {
			const dialogueService = this.dialogueFactoryService.getDialogueService(
				unfinishedDialogue.entryPointIntentName
			);
			const dialogueServiceAnswer = await dialogueService.proceed(
				messageObj,
				unfinishedDialogue
			);
			return dialogueServiceAnswer.answer;
		}
	}
}
