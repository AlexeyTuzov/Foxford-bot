import { Injectable } from '@nestjs/common';
import DialogueStatuses from 'src/modules/API/enums/dialogueStatus.enum';
import IAnswer from 'src/modules/API/interfaces/answer.interface';
import IMessage from 'src/modules/API/interfaces/message.interface';
import NluNode from '../../interfaces/nlu-node.interface';

@Injectable()
export default class LessonsService extends NluNode {
	public async analyze(messageObj: IMessage): Promise<IAnswer> {
		return {
			answer: 'Lessons service',
			dialogueStatus: DialogueStatuses.FINISHED
		};
	}
}
