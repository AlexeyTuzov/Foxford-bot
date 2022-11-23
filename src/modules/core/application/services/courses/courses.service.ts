import { Injectable } from '@nestjs/common';
import DialogueStatuses from 'src/modules/API/enums/dialogueStatus.enum';
import IAnswer from 'src/modules/API/interfaces/answer.interface';
import IMessage from 'src/modules/API/interfaces/message.interface';
import CoreNode from 'src/modules/core/interfaces/core-node.interface';
import DialogueBranches from 'src/modules/NLU/NLU-assets/dialogueFactory/enums/dialodueBranches.enum';

@Injectable()
export default class CoursesCoreService extends CoreNode {
	constructor() {
		super();
	}

	async processSpecific(messageObj: IMessage): Promise<IAnswer> {
		return {
			answer: 'zaglushka courses',
			dialogueStatus: DialogueStatuses.FINISHED
		};
	}
}
