import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import CommentsCoreService from 'src/modules/core/application/services/comments/comments.service';
import NluNode from '../../interfaces/nlu-node.interface';
import CommentsIntents from './comments.intents';
import { Cache } from 'cache-manager';

@Injectable()
export default class CommentsDialogueService extends NluNode {
	constructor(
		@Inject(CACHE_MANAGER) protected cacheManager: Cache,
		protected coreService: CommentsCoreService
	) {
		super();
	}

	protected allIntents = CommentsIntents;
}
