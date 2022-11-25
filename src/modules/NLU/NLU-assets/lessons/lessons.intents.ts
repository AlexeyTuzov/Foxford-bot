import Intent from '../../interfaces/intent.interface';
import LessonsIntentsNames from './enums/lessonsIntents.enum';

const LessonsIntents: Intent[] = [
	{
		name: LessonsIntentsNames.APPROVE_LESSON,
		entities: ['ставить', 'утверди']
	},
	{
		name: LessonsIntentsNames.CANCEL_LESSON,
		entities: ['отмен']
	},
	{
		name: LessonsIntentsNames.SCHEDULE_CHANGE,
		entities: ['измен', 'смен', 'поменя']
	},
	{
		name: LessonsIntentsNames.TRANSIT_LESSON,
		entities: ['перенес', 'перенос']
	}
];

export default LessonsIntents;
