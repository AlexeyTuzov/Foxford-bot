import { Injectable } from '@nestjs/common';
import Intent from '../../interfaces/intent.interface';
import { NluNode } from '../../interfaces/nlu-node.interface';
import EntryPointIntents from './entryPoint.intents';

@Injectable()
export default class EntryPointService implements NluNode {
	private readonly intents = EntryPointIntents;

	detectIntents(message: string): Intent[] {
		return this.intents.filter((intent) => {
			return intent.entities.find((entity) => {
				return message.match(RegExp(entity));
			});
		});
	}
}
