import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import DialogueStatuses from 'src/modules/API/enums/dialogueStatus.enum';
import IAnswer from 'src/modules/API/interfaces/answer.interface';
import IMessage from 'src/modules/API/interfaces/message.interface';
import NluNode from '../../interfaces/nlu-node.interface';
import DialogueFactoryService from '../dialogueFactory/dialogueFactory.service';
import EntryPointIntents from './entryPoint.intents';

@Injectable()
export default class EntryPointService extends NluNode {
	constructor(
		private readonly dialogueFactoryService: DialogueFactoryService,
		@Inject(CACHE_MANAGER) protected readonly cacheManager: Cache
	) {
		super();
	}

	protected allIntents = EntryPointIntents;

	public async analyze(messageObj: IMessage): Promise<IAnswer> {
		this.detectedIntents = this.detectIntents(messageObj.message);

		if (this.detectedIntents.length === 0) {
			return {
				answer: 'Сформулируйте Ваш запрос более конкретно!',
				dialogueStatus: DialogueStatuses.FINISHED
			};
		} else if (this.detectedIntents.length === 1) {
			const appropriateService = this.dialogueFactoryService.createDialogue(
				this.detectedIntents[0]
			);
			return appropriateService.analyze(messageObj);
		} else if (this.detectedIntents.length > 1) {
			return {
				answer:
					'Не удалось конкретизировать Ваши намерения! Попробуйте сформулировать запрос более конкретно!',
				dialogueStatus: DialogueStatuses.FINISHED
			};
		}
	}
}
