import { Module } from '@nestjs/common';
import CommentsCoreService from '../core/application/services/comments/comments.service';
import CoursesCoreService from '../core/application/services/courses/courses.service';
import FinancialCoreService from '../core/application/services/financial/financial.service';
import LessonsCoreService from '../core/application/services/lessons/lessons.service';
import StudentsCoreService from '../core/application/services/students/students.service';
import { TaskFormerService } from '../taskFormer/application/task-former.service';
import CommentsDialogueService from './NLU-assets/comments/comments.service';
import CourcesDialogueService from './NLU-assets/cources/courses.service';
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
		LessonsCoreService,
		CommentsCoreService,
		CoursesCoreService,
		FinancialCoreService,
		StudentsCoreService,
		TaskFormerService
	],
	exports: [EntryPointService, DialogueFactoryService]
})
export class NluModule {}
