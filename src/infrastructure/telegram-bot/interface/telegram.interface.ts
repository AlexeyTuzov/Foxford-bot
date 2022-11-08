export default interface ITelegramMessage {
	update: {
		update_id: number;
		message: {
			message_id: number;
			date: number;
			text: string;
		};
	};
}
