import { Injectable } from '@nestjs/common';
import DialogueFactoryInterface from '../../interfaces/dialogueFactory.interface';
import Intent from '../../interfaces/intent.interface';
import NluNode from '../../interfaces/nlu-node.interface';
import CommentsDialogueService from '../comments/comments.service';
import CourcesDialogueService from '../cources/courses.service';
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

	getDialogueService(intentName: string): NluNode {
		if (intentName === EntryPointIntentsNames.LESSONS_INFO) {
			return this.lessonsDialogueService;
		}
		if (intentName === EntryPointIntentsNames.STUDENTS_INFO) {
			return this.studentsDialogueService;
		}
		if (intentName === EntryPointIntentsNames.FINANCIAL_INFO) {
			return this.financialDialogueService;
		}
		if (intentName === EntryPointIntentsNames.COURCES_INFO) {
			return this.courcesDialogueService;
		}
		if (intentName === EntryPointIntentsNames.COMMENTS_INFO) {
			return this.commentsDialogueService;
		}
	}
}
