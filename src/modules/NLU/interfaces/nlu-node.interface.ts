import IAnswer from 'src/modules/API/interfaces/answer.interface';
import IMessage from 'src/modules/API/interfaces/message.interface';
import Intent from './intent.interface';
import { Cache } from 'cache-manager';
import DialogueBranches from '../NLU-assets/dialogueFactory/enums/dialogueBranches.enum';
import DialogueStatuses from 'src/modules/API/enums/dialogueStatus.enum';
import CoreNode from 'src/modules/core/interfaces/core-node.interface';

export default abstract class NluNode {
	protected allIntents: Intent[];
	protected cacheManager: Cache;
	protected coreService: CoreNode;
	protected detectedIntents: Intent[];

	public async analyze(messageObj: IMessage): Promise<IAnswer> {
		try {
			this.detectedIntents = this.detectIntents(messageObj.message);

			if (this.detectedIntents.length > 1) {
				return {
					answer:
						'Не удалось конкретизировать Ваши намерения! Попробуйте сформулировать запрос более конкретно!',
					dialogueStatus: DialogueStatuses.FINISHED
				};
			} else if (this.detectedIntents.length === 0) {
				const branchName = await this.setAppropriateBranch(
					messageObj,
					DialogueBranches.OTHER_QUESTION
				);
			} else if (this.detectedIntents.length === 1) {
				const branchName = await this.setAppropriateBranch(
					messageObj,
					this.detectedIntents[0].name
				);
			}
			const cachedMessage = await this.cacheManager.get(messageObj.userId);

			const answer = await this.coreService.process(messageObj, cachedMessage);

			return answer;
		} catch (err) {
			return {
				answer: 'Не удалось определить намерения пользователя :(',
				dialogueStatus: DialogueStatuses.FINISHED
			};
		}
	}

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
		intentName: string
	): Promise<void> {
		const messageCopy = messageObj;

		try {
			const branchesNames = Object.values(DialogueBranches);
			const findBranch = branchesNames.find((name) => name === intentName);
			if (!findBranch) {
				return console.log("Can't find such a dialogue branch name!");
			}
			messageCopy.dialogueBranch = findBranch;

			await this.cacheManager.set(messageObj.userId, messageCopy);
		} catch (err) {
			console.log(`Error in appropriate branch setting: ${err.message}`);
		}
	}

	public async proceed(
		messageObj: IMessage,
		cachedMessage: IMessage
	): Promise<IAnswer> {
		const answer = this.coreService.process(messageObj, cachedMessage);
		return answer;
	}
}
