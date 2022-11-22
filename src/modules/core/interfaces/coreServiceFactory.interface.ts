import DialogueBranches from 'src/modules/NLU/NLU-assets/dialogueFactory/enums/dialodueBranches.enum';
import CoreNode from './core-node.interface';

export default abstract class CoreServiceFactory {
	abstract getCoreService(branchName: DialogueBranches): CoreNode;
}
