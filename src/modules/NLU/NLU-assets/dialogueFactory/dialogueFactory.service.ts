import { Injectable } from '@nestjs/common';
import messageInterface from 'src/modules/API/interfaces/message.interface';
import DialogueFactoryInterface from '../../interfaces/dialogueFactory.interface';
import Intent from '../../interfaces/intent.interface';
import NluNode from '../../interfaces/nlu-node.interface';
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
		private financialService: FinancialService
		) { }

	createDialogue(
		incomingMessage: messageInterface,
		cachedMessage: messageInterface,
		intent: Intent
	): NluNode {

		if (intent.name === EntryPointIntentsNames.LESSONS_INFO) {
			return this.lessonsService;
		}
		if (intent.name === EntryPointIntentsNames.STUDENTS_INFO) {
			return this.studentsService;
		}
		if (intent.name === EntryPointIntentsNames.FINANCIAL_INFO) {
			return this.financialService;
		}
		
	}
}
