import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import StudentsCoreService from 'src/modules/core/application/services/students/students.service';
import NluNode from '../../interfaces/nlu-node.interface';
import StudentsIntents from './students.intents';
import { Cache } from 'cache-manager';

@Injectable()
export default class StudentsDialogueService extends NluNode {
	constructor(
		@Inject(CACHE_MANAGER) protected cacheManager: Cache,
		protected coreService: StudentsCoreService
	) {
		super();
	}

	protected allIntents = StudentsIntents;
}
