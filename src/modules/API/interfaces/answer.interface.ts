import DialogueStatuses from '../enums/dialogueStatus.enum';

export default interface IAnswer {
	answer: string;
	dialogueStatus: DialogueStatuses;
}
