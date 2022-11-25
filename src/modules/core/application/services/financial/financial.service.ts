import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import DialogueStatuses from 'src/modules/API/enums/dialogueStatus.enum';
import IAnswer from 'src/modules/API/interfaces/answer.interface';
import CoreNode from 'src/modules/core/interfaces/core-node.interface';
import DialogueBranches from 'src/modules/NLU/NLU-assets/dialogueFactory/enums/dialogueBranches.enum';
import { Cache } from 'cache-manager';
import { TaskFormerService } from 'src/modules/taskFormer/application/task-former.service';
import MetadataUnitNames from 'src/modules/API/enums/metadataUnitNames.enum';

@Injectable()
export default class FinancialCoreService extends CoreNode {
	constructor(
		@Inject(CACHE_MANAGER) protected cacheManager: Cache,
		private readonly taskFormer: TaskFormerService
	) {
		super();
	}

	async processSpecific(): Promise<IAnswer> {
		if (
			this.dialogueState.dialogueBranch === DialogueBranches.NO_ACT ||
			this.dialogueState.dialogueBranch === DialogueBranches.NO_SALARY
		) {
			if (
				!this.checkMetadata(MetadataUnitNames.REMIND_TEN_DAYS) &&
				this.checkMetadata(MetadataUnitNames.REMIND_TEN_DAYS) !== false
			) {
				return await this.askRemindTenDays();
			} else if (
				this.checkMetadata(MetadataUnitNames.REMIND_TEN_DAYS) === false
			) {
				await this.cacheManager.del(this.dialogueState.userId);
				return {
					answer:
						'Спасибо за честный ответ! Ожидайте Вашу оплату и акт в течение 10 рабочих дней',
					dialogueStatus: DialogueStatuses.FINISHED
				};
			} else if (
				this.checkMetadata(MetadataUnitNames.REMIND_TEN_DAYS) === true
			) {
				return await this.askPeriod();
			}
		}

		if (this.dialogueState.dialogueBranch === DialogueBranches.OTHER_QUESTION) {
			if (!this.checkMetadata(MetadataUnitNames.TEXT)) {
				return await this.askText();
			}
		}

		if (this.dialogueState.dialogueBranch === DialogueBranches.NO_BONUS) {
			if (!this.checkMetadata(MetadataUnitNames.TEXT)) {
				return await this.askText();
			}
			if (!this.checkMetadata(MetadataUnitNames.FIO_STUDENT)) {
				return await this.askStudentsFIO();
			}
		}

		//Temporary solution: there should be a class, that returns buttons to chat
		if (
			this.dialogueState.dialogueBranch === DialogueBranches.SELF_EMPLOYEED ||
			this.dialogueState.dialogueBranch === DialogueBranches.DOCS_CHANGE
		) {
			if (!this.checkMetadata(MetadataUnitNames.TEXT)) {
				return await this.askText();
			}
		}

		this.taskFormer.createTask(this.dialogueState);

		this.cacheManager.del(this.dialogueState.userId);

		return {
			answer: 'Спасибо за обращение! \nЗаявка по Вашему вопросу отправлена',
			dialogueStatus: DialogueStatuses.FINISHED
		};
	}

	private async askRemindTenDays(): Promise<IAnswer> {
		this.dialogueState.lastRequestedMetadataUnit =
			MetadataUnitNames.REMIND_TEN_DAYS;
		await this.cacheManager.set(this.dialogueState.userId, this.dialogueState);
		return this.getMetadataRequest(MetadataUnitNames.REMIND_TEN_DAYS);
	}

	private async askPeriod(): Promise<IAnswer> {
		this.dialogueState.lastRequestedMetadataUnit = MetadataUnitNames.PERIOD;
		await this.cacheManager.set(this.dialogueState.userId, this.dialogueState);
		return this.getMetadataRequest(MetadataUnitNames.PERIOD);
	}

	private async askText(): Promise<IAnswer> {
		this.dialogueState.lastRequestedMetadataUnit = MetadataUnitNames.TEXT;
		await this.cacheManager.set(this.dialogueState.userId, this.dialogueState);
		return this.getMetadataRequest(MetadataUnitNames.TEXT);
	}

	private async askStudentsFIO(): Promise<IAnswer> {
		this.dialogueState.lastRequestedMetadataUnit =
			MetadataUnitNames.FIO_STUDENT;
		await this.cacheManager.set(this.dialogueState.userId, this.dialogueState);
		return this.getMetadataRequest(MetadataUnitNames.FIO_STUDENT);
	}
}
