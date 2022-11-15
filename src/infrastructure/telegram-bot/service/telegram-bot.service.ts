import { Ctx, InjectBot, Message, On, Sender, Start, Update } from 'nestjs-telegraf';
import { ApiService } from 'src/modules/API/application/api.service';
import MessengerTypes from 'src/modules/API/enums/messenger.enum';
import IMessage from 'src/modules/API/interfaces/message.interface';
import { Context, Telegraf } from 'telegraf';
import TGMessage from '../decorators/message.decorator';
import ISender from '../interface/sender.interface';

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
	async hears(@Ctx() ctx: Context, @Message('text') message: string, @Sender() user: ISender) {
		const messageObj: IMessage = {
			userId: user.id,
			message,
			userFirstName: user.first_name,
			userLastName: user.last_name,
			messenger: MessengerTypes.TELEGRAM
		}
		this.apiService.processMessage(messageObj);
		await ctx.reply(`I have got message: ${message}`);
	}
}
