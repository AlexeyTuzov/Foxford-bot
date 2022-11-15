import IMessage from "src/modules/API/interfaces/message.interface";
import NluNode from "./nlu-node.interface";

export default abstract class DialogueFactoryInterface {
    abstract createDialogue(incomingMessage: IMessage, cachedMessage: IMessage): NluNode;

}