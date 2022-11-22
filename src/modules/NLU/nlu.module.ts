import { Module } from '@nestjs/common';
import LessonsCoreService from '../core/application/services/lessons/lessons.service';
import CommentsDialogueService from './NLU-assets/comments/comments.service';
import CourcesDialogueService from './NLU-assets/cources/cources.service';
import DialogueFactoryService from './NLU-assets/dialogueFactory/dialogueFactory.service';
import EntryPointService from './NLU-assets/entryPoint/entryPoint.service';
import FinancialDialogueService from './NLU-assets/financial/financial.service';
import LessonsDialogueService from './NLU-assets/lessons/lessons.service';
import StudentsDialogueService from './NLU-assets/students/students.service';

@Module({
	providers: [
		EntryPointService,
		DialogueFactoryService,
		LessonsDialogueService,
		StudentsDialogueService,
		FinancialDialogueService,
		CourcesDialogueService,
		CommentsDialogueService,
		LessonsCoreService
	],
	exports: [EntryPointService, DialogueFactoryService]
})
export class NluModule {}
