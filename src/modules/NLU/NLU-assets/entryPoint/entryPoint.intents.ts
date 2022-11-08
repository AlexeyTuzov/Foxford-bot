import Intent from '../../interfaces/intent.interface';
import EntryPointIntentsNames from './enums/entryPointIntents.enum';

const EntryPointIntents: Intent[] = [
	{
		name: EntryPointIntentsNames.GREET,
		entities: [
			'добрый день',
			'добрый вечер',
			'доброе утро',
			'здравствуйте',
			'привет'
		]
	},
	{
		name: EntryPointIntentsNames.GOODBYE,
		entities: [
			'пока',
			'до свидания',
			'счастливо',
			'всего хорошего',
			'спасибо',
			'благодарю'
		]
	},
	{
		name: EntryPointIntentsNames.STUDENTS_LESSONS_INFO,
		entities: ['ученик', 'студент', 'заняти']
	},
	{
		name: EntryPointIntentsNames.FINANCIAL_INFO,
		entities: ['плата', 'бонус', 'акт', 'штраф', 'пеня', 'реквизит', 'банк']
	}
];

export default EntryPointIntents;
