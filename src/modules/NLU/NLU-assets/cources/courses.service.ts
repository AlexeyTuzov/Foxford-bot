import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import CoursesCoreService from 'src/modules/core/application/services/courses/courses.service';
import NluNode from '../../interfaces/nlu-node.interface';
import CoursesIntents from './courses.intents';
import { Cache } from 'cache-manager';

@Injectable()
export default class CoursesDialogueService extends NluNode {
	constructor(
		@Inject(CACHE_MANAGER) protected cacheManager: Cache,
		protected coreService: CoursesCoreService
	) {
		super();
	}

	protected allIntents = CoursesIntents;
}
