import Intent from './intent.interface';
import NluNode from './nlu-node.interface';

export default abstract class DialogueFactoryInterface {
	abstract getDialogueService(intentName: string): NluNode;
}
