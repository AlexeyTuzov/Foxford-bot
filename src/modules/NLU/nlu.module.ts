import { Module } from '@nestjs/common';
import CommentsService from './NLU-assets/comments/comments.service';
import CourcesService from './NLU-assets/cources/cources.service';
import DialogueFactoryService from './NLU-assets/dialogueFactory/dialogueFactory.service';
import EntryPointService from './NLU-assets/entryPoint/entryPoint.service';
import FinancialService from './NLU-assets/financial/financial.service';
import LessonsService from './NLU-assets/lessons/lessons.service';
import StudentsService from './NLU-assets/students/students.service';

@Module({
	providers: [
		EntryPointService,
		DialogueFactoryService,
		LessonsService,
		StudentsService,
		FinancialService,
		CourcesService,
		CommentsService
	],
	exports: [EntryPointService, DialogueFactoryService]
})
export class NluModule {}
