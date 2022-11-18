import IMessage from 'src/modules/API/interfaces/message.interface';
import Intent from './intent.interface';
import NluNode from './nlu-node.interface';

export default abstract class DialogueFactoryInterface {
	abstract createDialogue(
		incomingMessage: IMessage,
		cachedMessage: IMessage,
		intent: Intent
	): NluNode;
}
