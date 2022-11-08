import { Inject, Injectable } from '@nestjs/common';
import EntryPointService from 'src/modules/NLU/NLU-assets/entryPoint/entryPoint.service';

@Injectable()
export class ApiService {
	constructor(private readonly enrtyPointService: EntryPointService) {}

	private readonly answers: string[];

	processMessage(message: string) {
		const lowercasedMessage = message.toLowerCase();
		const detectedIntents =
			this.enrtyPointService.detectIntents(lowercasedMessage);
		console.log(detectedIntents);
	}

	get getAnswers() {
		return this.answers;
	}
}
