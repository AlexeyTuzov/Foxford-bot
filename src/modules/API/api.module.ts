import { Module } from '@nestjs/common';
import { TelegramBotModule } from 'src/infrastructure/telegram-bot/telegram-bot.module';
import { ApiService } from './application/api.service';
import { ApiController } from './WEB/api.controller';

@Module({
    controllers: [ApiController],
    providers: [ApiService],
    imports: [TelegramBotModule]
})
export class ApiModule {}
