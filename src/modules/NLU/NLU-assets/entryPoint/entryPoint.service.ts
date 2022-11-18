import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import DialogueStatuses from 'src/modules/API/enums/dialogueStatus.enum';
import IAnswer from 'src/modules/API/interfaces/answer.interface';
import IMessage from 'src/modules/API/interfaces/message.interface';
import Intent from '../../interfaces/intent.interface';
import NluNode from '../../interfaces/nlu-node.interface';
import DialogueFactoryService from '../dialogueFactory/dialogueFactory.service';
import EntryPointIntents from './entryPoint.intents';

@Injectable()
export default class EntryPointService implements NluNode {
	constructor(
		private readonly dialogueFactoryService: DialogueFactoryService,
		@Inject(CACHE_MANAGER) private readonly cacheManager: Cache
	) {}
	private readonly allIntents = EntryPointIntents;
	private detectedIntents: Intent[];

	public async analyze(messageObj: IMessage): Promise<IAnswer> {

		this.detectedIntents = this.detectIntents(messageObj.message);

		if (this.detectedIntents.length === 0) {
			console.log('0 intents');
			return {
				answer: 'Сформулируйте Ваш запрос более конкретно!',
				dialogueStatus: DialogueStatuses.FINISHED
			};
		} else if (this.detectedIntents.length === 1) {
			console.log('1 intent');
			await this.cacheManager.set(
				messageObj.userId,
				messageObj,
				1000 * 60 * 60
			);
			const cachedMessage = await this.cacheManager.get(messageObj.userId);
			const appropriateService = this.dialogueFactoryService.createDialogue(
				messageObj,
				cachedMessage,
				this.detectedIntents[0]
			);
			console.log(appropriateService);
			return appropriateService.analyze(messageObj);
		} else if (this.detectedIntents.length > 1) {
			console.log('2 intents');
			return {
				answer:
					'Не удалось конкретизировать намерения пользователя! Попробуйте сформулировать запрос более конкретно!',
				dialogueStatus: DialogueStatuses.FINISHED
			};
		}
	}

	private detectIntents(message: string): Intent[] {
		const lowercasedMsg = message.toLowerCase();
		return this.allIntents.filter((intent) => {
			return intent.entities.find((entity) => {
				return lowercasedMsg.match(RegExp(entity));
			});
		});
	}
}
