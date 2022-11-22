import DialogueStatuses from 'src/modules/API/enums/dialogueStatus.enum';
import MetadataUnitNames from 'src/modules/API/enums/metadataUnitNames.enum';
import IAnswer from 'src/modules/API/interfaces/answer.interface';
import IMessage from 'src/modules/API/interfaces/message.interface';
import DialogueBranches from 'src/modules/NLU/NLU-assets/dialogueFactory/enums/dialodueBranches.enum';
import IRequest from './request.interface';

export default abstract class CoreNode {
	protected dialogueState: IMessage;
	protected metadataRequests: IRequest[];

	abstract process(
		branchName: DialogueBranches,
		messageObj: IMessage,
		cachedMessage: IMessage
	): IAnswer;

	protected checkMetadata(unitName: MetadataUnitNames): boolean {
		if (this.dialogueState.metadata) {
			const unit = this.dialogueState.metadata.find(
				(unit) => unit.name === unitName
			);
			return unit ? !!unit.value : false;
		}
	}

	protected getMetadataRequest(unitName: MetadataUnitNames): IAnswer {
		const metadataRequest = this.metadataRequests.find(
			(req) => req.name === unitName
		);
		if (!metadataRequest) {
			return {
				answer: 'Не удалось уточнить данные :(',
				dialogueStatus: DialogueStatuses.IN_PROGRESS
			};
		} else {
			return metadataRequest.request;
		}
	}
}
