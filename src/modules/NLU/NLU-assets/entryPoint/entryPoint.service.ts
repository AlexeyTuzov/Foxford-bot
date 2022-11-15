import { Injectable } from '@nestjs/common';
import DialogueStatuses from 'src/modules/API/enums/dialogueStatus.enum';
import IAnswer from 'src/modules/API/interfaces/answer.interface';
import IMessage from 'src/modules/API/interfaces/message.interface';
import Intent from '../../interfaces/intent.interface';
import NluNode from '../../interfaces/nlu-node.interface';
import EntryPointIntents from './entryPoint.intents';

@Injectable()
export default class EntryPointService implements NluNode {
	private readonly allIntents = EntryPointIntents;
	private detectedIntents: Intent[];

	public async analyze(messageObj: IMessage): Promise<IAnswer> {
		//TODO: real implementation
		this.detectedIntents = this.detectIntents(messageObj.message);
		console.log('detected intents:', this.detectedIntents);
		return {
			answer: 'aaa',
			dialogueStatus: DialogueStatuses.FINISHED
		}
	}

	private detectIntents(message: string): Intent[] {
		return this.allIntents.filter((intent) => {
			return intent.entities.find((entity) => {
				return message.match(RegExp(entity));
			});
		});
	}
}
