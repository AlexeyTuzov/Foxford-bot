import { Module } from '@nestjs/common';
import { TaskFormerService } from '../taskFormer/application/task-former.service';
import CommentsCoreService from './application/services/comments/comments.service';
import CoursesCoreService from './application/services/courses/courses.service';
import FinancialCoreService from './application/services/financial/financial.service';
import LessonsCoreService from './application/services/lessons/lessons.service';
import StudentsCoreService from './application/services/students/students.service';

@Module({
	providers: [
		LessonsCoreService,
		StudentsCoreService,
		CommentsCoreService,
		CoursesCoreService,
		FinancialCoreService,
		TaskFormerService
	],
	exports: [
		LessonsCoreService,
		StudentsCoreService,
		CommentsCoreService,
		CoursesCoreService,
		FinancialCoreService
	]
})
export class CoreModule {}
