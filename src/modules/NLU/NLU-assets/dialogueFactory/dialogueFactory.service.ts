import { Injectable } from '@nestjs/common';
import DialogueFactoryInterface from '../../interfaces/dialogueFactory.interface';
import Intent from '../../interfaces/intent.interface';
import NluNode from '../../interfaces/nlu-node.interface';
import CommentsDialogueService from '../comments/comments.service';
import CourcesDialogueService from '../cources/cources.service';
import EntryPointIntentsNames from '../entryPoint/enums/entryPointIntents.enum';
import FinancialDialogueService from '../financial/financial.service';
import LessonsDialogueService from '../lessons/lessons.service';
import StudentsDialogueService from '../students/students.service';

@Injectable()
export default class DialogueFactoryService
	implements DialogueFactoryInterface
{
	constructor(
		private lessonsDialogueService: LessonsDialogueService,
		private studentsDialogueService: StudentsDialogueService,
		private financialDialogueService: FinancialDialogueService,
		private courcesDialogueService: CourcesDialogueService,
		private commentsDialogueService: CommentsDialogueService
	) {}

	createDialogue(intent: Intent): NluNode {
		if (intent.name === EntryPointIntentsNames.LESSONS_INFO) {
			return this.lessonsDialogueService;
		}
		if (intent.name === EntryPointIntentsNames.STUDENTS_INFO) {
			return this.studentsDialogueService;
		}
		if (intent.name === EntryPointIntentsNames.FINANCIAL_INFO) {
			return this.financialDialogueService;
		}
		if (intent.name === EntryPointIntentsNames.COURCES_INFO) {
			return this.courcesDialogueService;
		}
		if (intent.name === EntryPointIntentsNames.COMMENTS_INFO) {
			return this.commentsDialogueService;
		}
	}
}
