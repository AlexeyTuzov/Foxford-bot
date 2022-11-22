import DialogueStatuses from '../enums/dialogueStatus.enum';
import MessengerTypes from '../enums/messenger.enum';
import DialogueBranches from 'src/modules/NLU/NLU-assets/dialogueFactory/enums/dialodueBranches.enum';
import MetadataUnit from './metadataUnit.interface';
import MetadataUnitNames from '../enums/metadataUnitNames.enum';

export default interface IMessage {
	userId: string;
	message: string;
	userFirstName: string;
	userLastName: string;
	messenger: MessengerTypes;
	dialogueStatus?: DialogueStatuses;
	dialogueBranch?: DialogueBranches;
	lastRequestedMetadataUnit?: MetadataUnitNames;
	metadata?: MetadataUnit[];
}
