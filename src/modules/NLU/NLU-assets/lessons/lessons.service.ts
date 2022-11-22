import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import LessonsCoreService from 'src/modules/core/application/services/lessons/lessons.service';
import NluNode from '../../interfaces/nlu-node.interface';
import LessonsIntents from './lessons.intents';

@Injectable()
export default class LessonsDialogueService extends NluNode {
	constructor(
		@Inject(CACHE_MANAGER) protected cacheManager: Cache,
		protected coreService: LessonsCoreService
	) {
		super();
	}

	protected allIntents = LessonsIntents;
}
