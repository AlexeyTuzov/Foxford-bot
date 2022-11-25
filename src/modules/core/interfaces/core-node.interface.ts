import DialogueStatuses from 'src/modules/API/enums/dialogueStatus.enum';
import MetadataUnitNames from 'src/modules/API/enums/metadataUnitNames.enum';
import IAnswer from 'src/modules/API/interfaces/answer.interface';
import IMessage from 'src/modules/API/interfaces/message.interface';
import IRequest from './request.interface';
import { Cache } from 'cache-manager';
import yesNoToBoolean from 'src/modules/NLU/helperFunctions/yesNoToBoolean';
import isTemporaryToBoolean from 'src/modules/NLU/helperFunctions/isTemporaryToBoolean';

export default abstract class CoreNode {
	protected dialogueState: IMessage;
	protected metadataRequests: IRequest[];
	protected cacheManager: Cache;

	abstract processSpecific(): Promise<IAnswer>;

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

		return await this.processSpecific();
	}

	protected checkMetadata(unitName: MetadataUnitNames): boolean | null {
		if (this.dialogueState.metadata) {
			const unit = this.dialogueState.metadata.find(
				(unit) => unit.name === unitName
			);
			return unit ? !!unit.value : null;
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

			let valueCopy = value;

			if (
				unitName === MetadataUnitNames.IS_CONCERTED &&
				typeof value === 'string'
			) {
				valueCopy = yesNoToBoolean(value);
			}

			if (
				unitName === MetadataUnitNames.IS_TEMPORARY &&
				typeof value === 'string'
			) {
				valueCopy = isTemporaryToBoolean(value);
			}

			this.dialogueState.metadata.push({
				name: unitName,
				value: valueCopy
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
