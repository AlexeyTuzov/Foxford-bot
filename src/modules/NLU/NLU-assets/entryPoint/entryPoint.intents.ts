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
		entities: ['плата', 'бонус', 'акт', 'штраф', 'пеня', 'реквизит', 'банк']
	}
];

export default EntryPointIntents;
