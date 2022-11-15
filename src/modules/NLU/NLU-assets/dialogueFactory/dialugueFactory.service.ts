import messageInterface from "src/modules/API/interfaces/message.interface";
import DialogueFactoryInterface from "../../interfaces/dialogueFactory.interface";
import NluNode from "../../interfaces/nlu-node.interface";
import EntryPointService from "../entryPoint/entryPoint.service";

export default class DialogueFactoryService implements DialogueFactoryInterface {
    constructor () {

    }

    createDialogue(incomingMessage: messageInterface, cachedMessage: messageInterface): NluNode {
        
        // TODO: Real classes implementation
        return new EntryPointService();
    }
}