import Intent from '../../interfaces/intent.interface';
import CoursesIntentsNames from './enums/coursesIntents.enum';

const CoursesIntents: Intent[] = [
	{
		name: CoursesIntentsNames.CHANGE_PROGRAM,
		entities: ['курс', 'программ']
	}
];

export default CoursesIntents;
