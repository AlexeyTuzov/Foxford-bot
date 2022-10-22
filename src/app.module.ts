import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TelegramBotModule } from './infrastructure/telegram-bot/telegram-bot.module';
import { ApiModule } from './modules/API/api.module';

@Module({
  imports: [
    ConfigModule.forRoot({
        isGlobal: true
    }),
    ApiModule,
    TelegramBotModule
]
})
export class AppModule {}
