import IAnswer from 'src/modules/API/interfaces/answer.interface';
import IMessage from 'src/modules/API/interfaces/message.interface';
import Intent from './intent.interface';

export default abstract class NluNode {
	abstract analyze(messageObj: IMessage): Promise<IAnswer>;

	protected allIntents: Intent[];

	protected detectIntents(message: string): Intent[] {
		const lowercasedMsg = message.toLowerCase();
		return this.allIntents.filter((intent) => {
			return intent.entities.find((entity) => {
				return lowercasedMsg.match(RegExp(entity));
			});
		});
	}
}
