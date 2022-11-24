import { Module } from '@nestjs/common';
import { TaskFormerService } from './application/task-former.service';

@Module({
	providers: [TaskFormerService],
	exports: [TaskFormerService]
})
export class TaskFormerModule {}
