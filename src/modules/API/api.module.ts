import { Module } from '@nestjs/common';
import { NluModule } from '../NLU/nlu.module';
import { ApiService } from './application/api.service';

@Module({
	providers: [ApiService],
	imports: [NluModule],
	exports: [ApiService]
})
export class ApiModule {}
