import { Module } from '@nestjs/common';
import { TelegramBotService } from './service/telegram-bot.service';
import * as LocalSession from 'telegraf-session-local';
import { TelegrafModule } from 'nestjs-telegraf';
import * as dotenv from 'dotenv';
import { ApiModule } from 'src/modules/API/api.module';
dotenv.config();

const session = new LocalSession({ database: 'session_db.json' });

@Module({
	providers: [TelegramBotService],
	exports: [TelegramBotService],
	imports: [
		TelegrafModule.forRoot({
			token: process.env.TELEGRAM_TOKEN,
			middlewares: [session.middleware()]
		}),
		ApiModule
	]
})
export class TelegramBotModule {}
