import { Injectable } from '@nestjs/common';
import { TelegramBotService } from 'src/infrastructure/telegram-bot/service/telegram-bot.service';

@Injectable()
export class ApiService {

    constructor(
        private readonly telegramService: TelegramBotService
    ) { }

    greet() {
        
    }
}
