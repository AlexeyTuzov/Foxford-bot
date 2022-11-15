import DialogueStatuses from "../enums/dialogueStatus.enum";
import MessengerTypes from "../enums/messenger.enum";

export default interface IMessage {
    userId: string,
    message: string;
    userFirstName: string;
    userLastName: string;
    messenger: MessengerTypes;
    dialogueStatus?: DialogueStatuses;
    dialogueBranch?: DialogueBranches;
    metadata?: any[];
}