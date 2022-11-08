import { Module } from '@nestjs/common';
import EntryPointService from './NLU-assets/entryPoint/entryPoint.service';

@Module({
	providers: [EntryPointService],
	exports: [EntryPointService]
})
export class NluModule {}
