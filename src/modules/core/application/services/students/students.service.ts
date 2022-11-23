import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import DialogueStatuses from 'src/modules/API/enums/dialogueStatus.enum';
import MetadataUnitNames from 'src/modules/API/enums/metadataUnitNames.enum';
import IAnswer from 'src/modules/API/interfaces/answer.interface';
import IMessage from 'src/modules/API/interfaces/message.interface';
import CoreNode from 'src/modules/core/interfaces/core-node.interface';
import DialogueBranches from 'src/modules/NLU/NLU-assets/dialogueFactory/enums/dialogueBranches.enum';
import StudentsMetadataRequests from './students.requests';
import { Cache } from 'cache-manager';

@Injectable()
export default class StudentsCoreService extends CoreNode {
	constructor(@Inject(CACHE_MANAGER) protected cacheManager: Cache) {
		super();
	}

	protected metadataRequests = StudentsMetadataRequests;

	async processSpecific(messageObj: IMessage): Promise<IAnswer> {
		if (!this.checkMetadata(MetadataUnitNames.FIO_STUDENT)) {
			this.dialogueState.lastRequestedMetadataUnit =
				MetadataUnitNames.FIO_STUDENT;
			await this.cacheManager.set(messageObj.userId, this.dialogueState);
			return this.getMetadataRequest(MetadataUnitNames.FIO_STUDENT);
		}

		if (!this.checkMetadata(MetadataUnitNames.LESSON_DATE_TIME)) {
			this.dialogueState.lastRequestedMetadataUnit =
				MetadataUnitNames.LESSON_DATE_TIME;
			await this.cacheManager.set(messageObj.userId, this.dialogueState);
			return this.getMetadataRequest(MetadataUnitNames.LESSON_DATE_TIME);
		}

		console.log('META:', this.dialogueState.metadata);
		if (
			this.dialogueState.dialogueBranch === DialogueBranches.DENIAL_OF_STUDENT
		) {
		} else if (
			this.dialogueState.dialogueBranch === DialogueBranches.TROUBLED_STUDENT
		) {
		} else if (
			this.dialogueState.dialogueBranch === DialogueBranches.STUDENT_ABSENT
		) {
		}

		return {
			answer: 'zaglushka students',
			dialogueStatus: DialogueStatuses.FINISHED
		};
	}
}
