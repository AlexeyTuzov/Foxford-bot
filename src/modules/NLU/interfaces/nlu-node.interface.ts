import IAnswer from 'src/modules/API/interfaces/answer.interface';
import IMessage from 'src/modules/API/interfaces/message.interface';
import Intent from './intent.interface';
import { Cache } from 'cache-manager';
import DialogueBranches from '../NLU-assets/dialogueFactory/enums/dialodueBranches.enum';

export default abstract class NluNode {
	abstract analyze(messageObj: IMessage): Promise<IAnswer>;

	protected allIntents: Intent[];
	protected cacheManager: Cache;

	protected detectIntents(message: string): Intent[] {
		const lowercasedMsg = message.toLowerCase();
		return this.allIntents.filter((intent) => {
			return intent.entities.find((entity) => {
				return lowercasedMsg.match(RegExp(entity));
			});
		});
	}

	protected async setAppropriateBranch(
		messageObj: IMessage,
		intent: Intent
	): Promise<DialogueBranches> {
		const messageCopy = messageObj;

		try {
			const branchesNames = Object.values(DialogueBranches);
			const findBranch = branchesNames.find((name) => name === intent.name);
			messageCopy.dialogueBranch = findBranch;

			await this.cacheManager.set(
				messageObj.userId,
				messageObj,
				1000 * 60 * 60
			);
			return findBranch;
		} catch (err) {
			console.log(
				`Error in appropriate branch setting (Lessons service): ${err.message}`
			);
		}
	}
}
