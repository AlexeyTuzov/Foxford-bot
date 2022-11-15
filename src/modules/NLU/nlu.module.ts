import { Module } from '@nestjs/common';
import DialogueFactoryService from './NLU-assets/dialogueFactory/dialugueFactory.service';
import EntryPointService from './NLU-assets/entryPoint/entryPoint.service';

@Module({
	providers: [EntryPointService, DialogueFactoryService],
	exports: [EntryPointService]
})
export class NluModule {}
