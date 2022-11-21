import { Injectable } from '@nestjs/common';
import DialogueFactoryInterface from '../../interfaces/dialogueFactory.interface';
import Intent from '../../interfaces/intent.interface';
import NluNode from '../../interfaces/nlu-node.interface';
import CommentsService from '../comments/comments.service';
import CourcesService from '../cources/cources.service';
import EntryPointIntentsNames from '../entryPoint/enums/entryPointIntents.enum';
import FinancialService from '../financial/financial.service';
import LessonsService from '../lessons/lessons.service';
import StudentsService from '../students/students.service';

@Injectable()
export default class DialogueFactoryService
	implements DialogueFactoryInterface
{
	constructor(
		private lessonsService: LessonsService,
		private studentsService: StudentsService,
		private financialService: FinancialService,
		private courcesService: CourcesService,
		private commentsService: CommentsService
		) { }

	createDialogue(intent: Intent): NluNode {

		if (intent.name === EntryPointIntentsNames.LESSONS_INFO) {
			return this.lessonsService;
		}
		if (intent.name === EntryPointIntentsNames.STUDENTS_INFO) {
			return this.studentsService;
		}
		if (intent.name === EntryPointIntentsNames.FINANCIAL_INFO) {
			return this.financialService;
		}
		if (intent.name === EntryPointIntentsNames.COURCES_INFO) {
			return this.courcesService;
		}
		if (intent.name === EntryPointIntentsNames.COMMENTS_INFO) {
			return this.commentsService;
		}
	}
}
