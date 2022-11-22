import { Injectable } from '@nestjs/common';
import DialogueStatuses from 'src/modules/API/enums/dialogueStatus.enum';
import IAnswer from 'src/modules/API/interfaces/answer.interface';
import IMessage from 'src/modules/API/interfaces/message.interface';
import CoreNode from 'src/modules/core/interfaces/core-node.interface';
import DialogueBranches from 'src/modules/NLU/NLU-assets/dialogueFactory/enums/dialodueBranches.enum';

@Injectable()
export default class LessonsCoreService extends CoreNode {
	constructor() {
		super();
	}

	process(
		branchName: DialogueBranches,
		messageObj: IMessage,
		cachedMessage: IMessage
	): IAnswer {
		return {
			answer: 'zaglushka',
			dialogueStatus: DialogueStatuses.FINISHED
		};
	}
}
