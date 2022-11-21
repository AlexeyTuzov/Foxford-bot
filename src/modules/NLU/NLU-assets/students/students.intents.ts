import Intent from '../../interfaces/intent.interface';
import StudentsIntentsNames from './enums/studentsIntents.enum';

const StudentsIntents: Intent[] = [
	{
		name: StudentsIntentsNames.DENIAL_OF_STUDENT,
		entities: ['отказ']
	},
	{
		name: StudentsIntentsNames.TROUBLED_STUDENT,
		entities: ['сложн', 'трудно', 'проблемн']
	},
	{
		name: StudentsIntentsNames.STUDENT_ABSCENT,
		entities: ['опаздыв', 'опозд', 'поздн', 'не вышел', 'не вышла', 'отсутств']
	}
];
