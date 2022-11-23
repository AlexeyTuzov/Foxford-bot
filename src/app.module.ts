import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TelegramBotModule } from './infrastructure/telegram-bot/telegram-bot.module';
import { ApiModule } from './modules/API/api.module';
import { NluModule } from './modules/NLU/nlu.module';
import * as redisStore from 'cache-manager-redis-store/dist/index';
import { CoreModule } from './modules/core/core.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true
		}),
		CacheModule.register({
			isGlobal: true,
			store: redisStore,
			host: process.env.REDIS_HOST,
			ttl: 3600
		}),
		ApiModule,
		TelegramBotModule,
		NluModule,
		CoreModule
	]
})
export class AppModule {}
