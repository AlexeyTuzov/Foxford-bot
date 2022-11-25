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
			return await this.askStudentsFIO();
		}

		if (!this.checkMetadata(MetadataUnitNames.COURCE_NAME)) {
			return await this.askCourseName();
		}

		if (this.dialogueState.dialogueBranch !== DialogueBranches.APPROVE_LESSON) {
			if (
				this.checkMetadata(MetadataUnitNames.IS_CONCERTED) === false &&
				!this.checkMetadata(MetadataUnitNames.REASON_OF_NO_CONCERTION)
			) {
				return await this.askReasonOfNoConcertion();
			}
			if (
				!this.checkMetadata(MetadataUnitNames.IS_CONCERTED) &&
				this.checkMetadata(MetadataUnitNames.IS_CONCERTED) !== false
			) {
				return await this.askIsConcerted();
			}
			if (!this.checkMetadata(MetadataUnitNames.DATE_OF_DENIAL)) {
				return await this.askDateOfDenial();
			}
		}

		if (
			this.dialogueState.dialogueBranch === DialogueBranches.CANCEL_LESSON ||
			this.dialogueState.dialogueBranch === DialogueBranches.TRANSIT_LESSON
		) {
			if (!this.checkMetadata(MetadataUnitNames.NEW_SINGLE_LESSON_DATE)) {
				return await this.askNewDateSingle();
			}
		}

		if (
			this.dialogueState.dialogueBranch === DialogueBranches.SCHEDULE_CHANGE
		) {
			if (!this.checkMetadata(MetadataUnitNames.NEW_MULTIPLE_LESSONS_DATES)) {
				return await this.askNewSchedule();
			}
			if (!this.checkMetadata(MetadataUnitNames.NEW_COURCE_NAME)) {
				return await this.askNewCourseName();
			}
			if (!this.checkMetadata(MetadataUnitNames.DATE_TO_APPLY_CHANGES)) {
				return await this.askDateToApply();
			}
			if (!this.checkMetadata(MetadataUnitNames.REASON_OF_CHANGE)) {
				return await this.askReasonOfChange();
			}
		}

		if (this.dialogueState.dialogueBranch === DialogueBranches.APPROVE_LESSON) {
			if (
				!this.checkMetadata(MetadataUnitNames.IS_TEMPORARY) &&
				this.checkMetadata(MetadataUnitNames.IS_TEMPORARY) !== false
			) {
				return await this.askIsTemporary();
			}
			if (!this.checkMetadata(MetadataUnitNames.MULTIPLE_LESSONS_DATES)) {
				return await this.askSchedule();
			}
			if (!this.checkMetadata(MetadataUnitNames.DATE_TO_APPLY_CHANGES)) {
				return await this.askDateToApply();
			}
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

	private async askReasonOfNoConcertion(): Promise<IAnswer> {
		this.dialogueState.lastRequestedMetadataUnit =
			MetadataUnitNames.REASON_OF_NO_CONCERTION;
		await this.cacheManager.set(this.dialogueState.userId, this.dialogueState);
		return this.getMetadataRequest(MetadataUnitNames.REASON_OF_NO_CONCERTION);
	}

	private async askIsConcerted(): Promise<IAnswer> {
		this.dialogueState.lastRequestedMetadataUnit =
			MetadataUnitNames.IS_CONCERTED;
		await this.cacheManager.set(this.dialogueState.userId, this.dialogueState);
		return this.getMetadataRequest(MetadataUnitNames.IS_CONCERTED);
	}

	private async askDateOfDenial(): Promise<IAnswer> {
		this.dialogueState.lastRequestedMetadataUnit =
			MetadataUnitNames.DATE_OF_DENIAL;
		await this.cacheManager.set(this.dialogueState.userId, this.dialogueState);
		return this.getMetadataRequest(MetadataUnitNames.DATE_OF_DENIAL);
	}

	private async askNewDateSingle(): Promise<IAnswer> {
		this.dialogueState.lastRequestedMetadataUnit =
			MetadataUnitNames.NEW_SINGLE_LESSON_DATE;
		await this.cacheManager.set(this.dialogueState.userId, this.dialogueState);
		return this.getMetadataRequest(MetadataUnitNames.NEW_SINGLE_LESSON_DATE);
	}

	private async askNewSchedule(): Promise<IAnswer> {
		this.dialogueState.lastRequestedMetadataUnit =
			MetadataUnitNames.NEW_MULTIPLE_LESSONS_DATES;
		await this.cacheManager.set(this.dialogueState.userId, this.dialogueState);
		return this.getMetadataRequest(
			MetadataUnitNames.NEW_MULTIPLE_LESSONS_DATES
		);
	}

	private async askSchedule(): Promise<IAnswer> {
		this.dialogueState.lastRequestedMetadataUnit =
			MetadataUnitNames.MULTIPLE_LESSONS_DATES;
		await this.cacheManager.set(this.dialogueState.userId, this.dialogueState);
		return this.getMetadataRequest(MetadataUnitNames.MULTIPLE_LESSONS_DATES);
	}

	private async askIsTemporary(): Promise<IAnswer> {
		this.dialogueState.lastRequestedMetadataUnit =
			MetadataUnitNames.IS_TEMPORARY;
		await this.cacheManager.set(this.dialogueState.userId, this.dialogueState);
		return this.getMetadataRequest(MetadataUnitNames.IS_TEMPORARY);
	}

	private async askCourseName(): Promise<IAnswer> {
		this.dialogueState.lastRequestedMetadataUnit =
			MetadataUnitNames.COURCE_NAME;
		await this.cacheManager.set(this.dialogueState.userId, this.dialogueState);
		return this.getMetadataRequest(MetadataUnitNames.COURCE_NAME);
	}

	private async askNewCourseName(): Promise<IAnswer> {
		this.dialogueState.lastRequestedMetadataUnit =
			MetadataUnitNames.NEW_COURCE_NAME;
		await this.cacheManager.set(this.dialogueState.userId, this.dialogueState);
		return this.getMetadataRequest(MetadataUnitNames.NEW_COURCE_NAME);
	}

	private async askDateToApply(): Promise<IAnswer> {
		this.dialogueState.lastRequestedMetadataUnit =
			MetadataUnitNames.DATE_TO_APPLY_CHANGES;
		await this.cacheManager.set(this.dialogueState.userId, this.dialogueState);
		return this.getMetadataRequest(MetadataUnitNames.DATE_TO_APPLY_CHANGES);
	}

	private async askReasonOfChange(): Promise<IAnswer> {
		this.dialogueState.lastRequestedMetadataUnit =
			MetadataUnitNames.REASON_OF_CHANGE;
		await this.cacheManager.set(this.dialogueState.userId, this.dialogueState);
		return this.getMetadataRequest(MetadataUnitNames.REASON_OF_CHANGE);
	}
}
