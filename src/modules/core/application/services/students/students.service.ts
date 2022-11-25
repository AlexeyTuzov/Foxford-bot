import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import DialogueStatuses from 'src/modules/API/enums/dialogueStatus.enum';
import MetadataUnitNames from 'src/modules/API/enums/metadataUnitNames.enum';
import IAnswer from 'src/modules/API/interfaces/answer.interface';
import IMessage from 'src/modules/API/interfaces/message.interface';
import CoreNode from 'src/modules/core/interfaces/core-node.interface';
import DialogueBranches from 'src/modules/NLU/NLU-assets/dialogueFactory/enums/dialogueBranches.enum';
import StudentsMetadataRequests from './students.requests';
import { Cache } from 'cache-manager';
import { TaskFormerService } from 'src/modules/taskFormer/application/task-former.service';

@Injectable()
export default class StudentsCoreService extends CoreNode {
	constructor(
		@Inject(CACHE_MANAGER) protected cacheManager: Cache,
		private readonly taskFormer: TaskFormerService
	) {
		super();
	}

	protected metadataRequests = StudentsMetadataRequests;

	async processSpecific(messageObj: IMessage): Promise<IAnswer> {
		if (!this.checkMetadata(MetadataUnitNames.FIO_STUDENT)) {
			return await this.askStudentsFIO();
		}

		if (!this.checkMetadata(MetadataUnitNames.LESSON_DATE_TIME)) {
			return await this.askLessonDateTime();
		}

		if (
			this.dialogueState.dialogueBranch === DialogueBranches.DENIAL_OF_STUDENT
		) {
			if (!this.checkMetadata(MetadataUnitNames.REASON_OF_CHANGE)) {
				return await this.askReasonOfChange();
			}
		} else if (
			this.dialogueState.dialogueBranch === DialogueBranches.TROUBLED_STUDENT ||
			this.dialogueState.dialogueBranch === DialogueBranches.OTHER_QUESTION
		) {
			if (!this.checkMetadata(MetadataUnitNames.TEXT)) {
				return await this.askForDetails();
			}
		}

		this.taskFormer.createTask(this.dialogueState);

		this.cacheManager.del(messageObj.userId);

		if (this.dialogueState.dialogueBranch === DialogueBranches.STUDENT_ABSENT) {
			return {
				answer:
					'Спасибо за обращение! \nНапишите в чат виртуального класса ученику сообщение, что Вы его ждете. Подождите ещё 25 минут, а после напишите ещё раз сообщение и отключайтесь от урока',
				dialogueStatus: DialogueStatuses.FINISHED
			};
		}

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
			MetadataUnitNames.LESSON_DATE_TIME;
		await this.cacheManager.set(this.dialogueState.userId, this.dialogueState);
		return this.getMetadataRequest(MetadataUnitNames.LESSON_DATE_TIME);
	}

	private async askReasonOfChange(): Promise<IAnswer> {
		this.dialogueState.lastRequestedMetadataUnit =
			MetadataUnitNames.REASON_OF_CHANGE;
		await this.cacheManager.set(this.dialogueState.userId, this.dialogueState);
		return this.getMetadataRequest(MetadataUnitNames.REASON_OF_CHANGE);
	}

	private async askForDetails(): Promise<IAnswer> {
		this.dialogueState.lastRequestedMetadataUnit = MetadataUnitNames.TEXT;
		await this.cacheManager.set(this.dialogueState.userId, this.dialogueState);
		return this.getMetadataRequest(MetadataUnitNames.TEXT);
	}
}
