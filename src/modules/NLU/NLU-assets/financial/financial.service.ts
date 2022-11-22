import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import FinancialCoreService from 'src/modules/core/application/services/financial/financial.service';
import NluNode from '../../interfaces/nlu-node.interface';
import FinancialIntents from './financial.intents';
import { Cache } from 'cache-manager';

@Injectable()
export default class FinancialDialogueService extends NluNode {
	constructor(
		@Inject(CACHE_MANAGER) protected cacheManager: Cache,
		protected coreService: FinancialCoreService
	) {
		super();
	}

	protected allIntents = FinancialIntents;
}
