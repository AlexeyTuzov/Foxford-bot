import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import DialogueStatuses from 'src/modules/API/enums/dialogueStatus.enum';
import IAnswer from 'src/modules/API/interfaces/answer.interface';
import IMessage from 'src/modules/API/interfaces/message.interface';
import CoreNode from 'src/modules/core/interfaces/core-node.interface';
import { Cache } from 'cache-manager';
import { TaskFormerService } from 'src/modules/taskFormer/application/task-former.service';
import LessonsMetadataRequests from './lessons.requests';
import MetadataUnitNames from 'src/modules/API/enums/metadataUnitNames.enum';
import DialogueBranches from 'src/modules/NLU/NLU-assets/dialogueFactory/enums/dialogueBranches.enum';

@Injectable()
export default class LessonsCoreService extends CoreNode {
	constructor(
		@Inject(CACHE_MANAGER) protected cacheManager: Cache,
		private readonly taskFormer: TaskFormerService
	) {
		super();
	}

	protected metadataRequests = LessonsMetadataRequests;

	async processSpecific(messageObj: IMessage): Promise<IAnswer> {
		if (!this.checkMetadata(MetadataUnitNames.FIO_STUDENT)) {
			this.dialogueState.lastRequestedMetadataUnit =
				MetadataUnitNames.FIO_STUDENT;
			await this.cacheManager.set(messageObj.userId, this.dialogueState);
			return this.getMetadataRequest(MetadataUnitNames.FIO_STUDENT);
		}

		if (this.dialogueState.dialogueBranch !== DialogueBranches.APPROVE_LESSON) {
			if (
				this.checkMetadata(MetadataUnitNames.IS_CONCERTED) === false &&
				!this.checkMetadata(MetadataUnitNames.REASON_OF_NO_CONCERTION)
			) {
				this.dialogueState.lastRequestedMetadataUnit =
					MetadataUnitNames.REASON_OF_NO_CONCERTION;
				await this.cacheManager.set(messageObj.userId, this.dialogueState);
				return this.getMetadataRequest(
					MetadataUnitNames.REASON_OF_NO_CONCERTION
				);
			}
			if (
				!this.checkMetadata(MetadataUnitNames.IS_CONCERTED) &&
				this.checkMetadata(MetadataUnitNames.IS_CONCERTED) !== false
			) {
				this.dialogueState.lastRequestedMetadataUnit =
					MetadataUnitNames.IS_CONCERTED;
				await this.cacheManager.set(messageObj.userId, this.dialogueState);
				return this.getMetadataRequest(MetadataUnitNames.IS_CONCERTED);
			}
		}

		this.taskFormer.createTask(this.dialogueState);

		this.cacheManager.del(messageObj.userId);

		return {
			answer: 'Спасибо за обращение! \nЗаявка по Вашему вопросу отправлена',
			dialogueStatus: DialogueStatuses.FINISHED
		};
	}
}
