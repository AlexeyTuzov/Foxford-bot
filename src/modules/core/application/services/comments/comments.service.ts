import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import DialogueStatuses from 'src/modules/API/enums/dialogueStatus.enum';
import IAnswer from 'src/modules/API/interfaces/answer.interface';
import IMessage from 'src/modules/API/interfaces/message.interface';
import CoreNode from 'src/modules/core/interfaces/core-node.interface';
import { TaskFormerService } from 'src/modules/taskFormer/application/task-former.service';
import { Cache } from 'cache-manager';
import CommentsMetadataRequests from './comments.requests';
import MetadataUnitNames from 'src/modules/API/enums/metadataUnitNames.enum';

@Injectable()
export default class CommentsCoreService extends CoreNode {
	constructor(
		@Inject(CACHE_MANAGER) protected cacheManager: Cache,
		private readonly taskFormer: TaskFormerService
	) {
		super();
	}

	protected metadataRequests = CommentsMetadataRequests;

	async processSpecific(messageObj: IMessage): Promise<IAnswer> {
		if (!this.checkMetadata(MetadataUnitNames.FIO_STUDENT)) {
			return await this.askStudentsFIO();
		}

		if (!this.checkMetadata(MetadataUnitNames.NEW_SINGLE_LESSON_DATE)) {
			return await this.askLessonDateTime();
		}

		this.taskFormer.createTask(this.dialogueState);

		this.cacheManager.del(messageObj.userId);

		return {
			answer: 'Спасибо за обращение! \nЗаявка по Вашему вопросу отправлена',
			dialogueStatus: DialogueStatuses.FINISHED
		};
	}

	private async askStudentsFIO(): Promise<IAnswer> {
		this.dialogueState.lastRequestedMetadataUnit =
			MetadataUnitNames.FIO_STUDENT;
		await this.cacheManager.set(this.dialogueState.userId, this.dialogueState);
		return this.getMetadataRequest(MetadataUnitNames.FIO_STUDENT);
	}

	private async askLessonDateTime(): Promise<IAnswer> {
		this.dialogueState.lastRequestedMetadataUnit =
			MetadataUnitNames.NEW_SINGLE_LESSON_DATE;
		await this.cacheManager.set(this.dialogueState.userId, this.dialogueState);
		return this.getMetadataRequest(MetadataUnitNames.NEW_SINGLE_LESSON_DATE);
	}
}
