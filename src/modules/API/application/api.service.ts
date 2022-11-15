import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import DialogueFactoryService from 'src/modules/NLU/NLU-assets/dialogueFactory/dialugueFactory.service';
import EntryPointService from 'src/modules/NLU/NLU-assets/entryPoint/entryPoint.service';
import DialogueStatuses from '../enums/dialogueStatus.enum';
import IMessage from '../interfaces/message.interface';

@Injectable()
export class ApiService {
	constructor(
		@Inject(CACHE_MANAGER) private cacheManager: Cache, 
		private readonly enrtyPointService: EntryPointService,
		private readonly dialogueFactoryService: DialogueFactoryService
	) {}

	private readonly answers: string[];

	async processMessage(messageObj: IMessage): Promise<string> {
		
		const dialogueId = messageObj.userId;

		const findUnfinishedDialogue = await this.cacheManager.get(dialogueId);

		if (!findUnfinishedDialogue) {
			//await this.cacheManager.set(dialogueId, messageObj, 1000*60*60);
			const entryPointAnswer = await this.enrtyPointService.analyze(messageObj);
				return entryPointAnswer.answer;
		} else {
			this.dialogueFactoryService.createDialogue(messageObj, findUnfinishedDialogue);
		}

		/*
		await this.cacheManager.set(generatedId, message, 0);
		await this.cacheManager.del(generatedId);
		const cachedMessage = await this.cacheManager.get(generatedId);
		*/

		//It is needed to return smtng to the user from this method. Saving all dialogue info into a redis before that 
	}

	get getAnswers() {
		return this.answers;
	}
}
