import DialogueStatuses from 'src/modules/API/enums/dialogueStatus.enum';
import MetadataUnitNames from 'src/modules/API/enums/metadataUnitNames.enum';
import IAnswer from 'src/modules/API/interfaces/answer.interface';
import IMessage from 'src/modules/API/interfaces/message.interface';
import DialogueBranches from 'src/modules/NLU/NLU-assets/dialogueFactory/enums/dialodueBranches.enum';
import IRequest from './request.interface';
import { Cache } from 'cache-manager';
import CommonRequests from 'src/modules/API/interfaces/common.requests';

export default abstract class CoreNode {
	protected dialogueState: IMessage;
	protected metadataRequests: IRequest[] = CommonRequests;
	protected cacheManager: Cache;

	abstract processSpecific(
		messageObj: IMessage,
		cachedMessage: IMessage
	): Promise<IAnswer>;

	async process(
		messageObj: IMessage,
		cachedMessage: IMessage
	): Promise<IAnswer> {
		this.dialogueState = cachedMessage;

		if (this.dialogueState.lastRequestedMetadataUnit) {
			await this.setMetadata(
				this.dialogueState.lastRequestedMetadataUnit,
				messageObj.message
			);
		}

		if (!this.checkMetadata(MetadataUnitNames.FIO_AGENT)) {
			this.dialogueState.lastRequestedMetadataUnit =
				MetadataUnitNames.FIO_AGENT;
			await this.cacheManager.set(messageObj.userId, this.dialogueState);
			return this.getMetadataRequest(MetadataUnitNames.FIO_AGENT);
		}

		if (!this.checkMetadata(MetadataUnitNames.EMAIL)) {
			this.dialogueState.lastRequestedMetadataUnit = MetadataUnitNames.EMAIL;
			await this.cacheManager.set(messageObj.userId, this.dialogueState);
			return this.getMetadataRequest(MetadataUnitNames.EMAIL);
		}

		return await this.processSpecific(messageObj, cachedMessage);
	}

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

	protected async setMetadata(
		unitName: MetadataUnitNames,
		value: string | boolean
	): Promise<void> {
		try {
			if (!this.dialogueState.metadata) {
				this.dialogueState.metadata = [];
			}

			this.dialogueState.metadata.push({
				name: unitName,
				value
			});
			this.dialogueState.lastRequestedMetadataUnit = null;
			await this.cacheManager.set(
				this.dialogueState.userId,
				this.dialogueState
			);
		} catch (err) {
			console.log('Metadata setting error:', err.message);
		}
	}
}
