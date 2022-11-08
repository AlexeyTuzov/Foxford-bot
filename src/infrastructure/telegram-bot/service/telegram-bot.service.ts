import { Ctx, InjectBot, On, Start, Update } from 'nestjs-telegraf';
import { ApiService } from 'src/modules/API/application/api.service';
import { Context, Telegraf } from 'telegraf';
import TGMessage from '../decorators/message.decorator';

@Update()
export class TelegramBotService {
	constructor(
		@InjectBot() private readonly bot: Telegraf<Context>,
		private readonly apiService: ApiService
	) {}

	@Start()
	async start(ctx: Context) {
		await ctx.reply('Welome to Foxford bot! Ask You questions here');
	}

	@On('text')
	async hears(@Ctx() ctx: Context, @TGMessage() message: string) {
		this.apiService.processMessage(message);
		await ctx.reply(`I have heared ${message}`);
	}
}
