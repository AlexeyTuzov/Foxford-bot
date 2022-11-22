import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import DialogueStatuses from 'src/modules/API/enums/dialogueStatus.enum';
import IAnswer from 'src/modules/API/interfaces/answer.interface';
import IMessage from 'src/modules/API/interfaces/message.interface';
import LessonsCoreService from 'src/modules/core/application/services/lessons/lessons.service';
import Intent from '../../interfaces/intent.interface';
import NluNode from '../../interfaces/nlu-node.interface';
import DialogueBranches from '../dialogueFactory/enums/dialodueBranches.enum';
import LessonsIntents from './lessons.intents';

@Injectable()
export default class LessonsDialogueService extends NluNode {
	constructor(
		@Inject(CACHE_MANAGER) protected cacheManager: Cache,
		private lessonsCoreService: LessonsCoreService
	) {
		super();
	}

	protected allIntents = LessonsIntents;
	private detectedIntents: Intent[];

	public async analyze(messageObj: IMessage): Promise<IAnswer> {
		try {
			this.detectedIntents = this.detectIntents(messageObj.message);

			if (this.detectedIntents.length === 0) {
				return {
					answer: 'Сформулируйте Ваш запрос более конкретно!',
					dialogueStatus: DialogueStatuses.FINISHED
				};
			} else if (this.detectedIntents.length > 1) {
				return {
					answer:
						'Не удалось конкретизировать Ваши намерения! Попробуйте сформулировать запрос более конкретно!',
					dialogueStatus: DialogueStatuses.FINISHED
				};
			} else if (this.detectedIntents.length === 1) {
				const branchName = await this.setAppropriateBranch(
					messageObj,
					this.detectedIntents[0]
				);
				const cachedMessage = await this.cacheManager.get(messageObj.userId);

				const answer = this.lessonsCoreService.process(
					branchName,
					messageObj,
					cachedMessage
				);

				return answer;
			}
		} catch (err) {
			return {
				answer: 'Не удалось определить намерения пользователя :(',
				dialogueStatus: DialogueStatuses.FINISHED
			};
		}
	}
}
