import { Module } from '@nestjs/common';
import { CoreService } from './application/core.service';
import LessonsCoreService from './application/services/lessons/lessons.service';

@Module({
	providers: [CoreService, LessonsCoreService],
	exports: [LessonsCoreService]
})
export class CoreModule {}
