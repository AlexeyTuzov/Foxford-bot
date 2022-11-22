import { Injectable } from '@nestjs/common';
import DialogueBranches from 'src/modules/NLU/NLU-assets/dialogueFactory/enums/dialodueBranches.enum';
import LessonsIntents from 'src/modules/NLU/NLU-assets/lessons/lessons.intents';
import CoreNode from '../interfaces/core-node.interface';
import CoreServiceFactory from '../interfaces/coreServiceFactory.interface';
import LessonsCoreService from './services/lessons/lessons.service';

@Injectable()
export class CoreService implements CoreServiceFactory {
	constructor(private lessonsCoreNode: LessonsCoreService) {}

	private lessonsIntents = LessonsIntents;

	getCoreService(branchName: DialogueBranches): CoreNode {
		if (this.lessonsIntents.find((intent) => intent.name === branchName)) {
			return this.lessonsCoreNode;
		}
	}
}
