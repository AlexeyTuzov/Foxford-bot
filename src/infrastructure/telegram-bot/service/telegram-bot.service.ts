import { Ctx, InjectBot, On, Start, Update } from 'nestjs-telegraf';
import { Context, Telegraf } from 'telegraf';
import TGMessage from '../decorators/message.decorator';

@Update()
export class TelegramBotService {

    constructor(@InjectBot() private readonly bot: Telegraf<Context>) { }

    @Start()
    async start(ctx: Context) {
        await ctx.reply('It\'s working!');
    }

    @On('text')
    async hears(@Ctx() ctx: Context, @TGMessage() message: string) {
        await ctx.reply(`I have heared ${message}`);
    }
}
