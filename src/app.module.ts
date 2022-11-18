import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TelegramBotModule } from './infrastructure/telegram-bot/telegram-bot.module';
import { ApiModule } from './modules/API/api.module';
import { NluModule } from './modules/NLU/nlu.module';
import * as redisStore from 'cache-manager-redis-store/dist/index';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true
		}),
		CacheModule.register({
			isGlobal: true,
			store: redisStore,
			host: process.env.REDIS_HOST
		}),
		ApiModule,
		TelegramBotModule,
		NluModule
	]
})
export class AppModule {}
