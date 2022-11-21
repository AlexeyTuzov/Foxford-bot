import Intent from './intent.interface';
import NluNode from './nlu-node.interface';

export default abstract class DialogueFactoryInterface {
	abstract createDialogue(intent: Intent): NluNode;
}
