import Intent from '../../interfaces/intent.interface';
import EntryPointIntentsNames from './enums/entryPointIntents.enum';

const EntryPointIntents: Intent[] = [
	{
		name: EntryPointIntentsNames.STUDENTS_INFO,
		entities: ['ученик', 'студент']
	},
	{
		name: EntryPointIntentsNames.LESSONS_INFO,
		entities: ['заняти']
	},
	{
		name: EntryPointIntentsNames.FINANCIAL_INFO,
		entities: [
			'пеня',
			'пени',
			'штраф',
			'налог',
			'чек',
			'самозанят',
			'зарплат',
			'заработ',
			'плата',
			'деньги',
			'бонус',
			'акт',
			'реквизит',
			'банк',
			'документ'
		]
	},
	{
		name: EntryPointIntentsNames.COURCES_INFO,
		entities: ['курс', 'программ']
	},
	{
		name: EntryPointIntentsNames.COMMENTS_INFO,
		entities: ['коммент']
	}
];

export default EntryPointIntents;
