import DialogueStatuses from 'src/modules/API/enums/dialogueStatus.enum';
import MetadataUnitNames from 'src/modules/API/enums/metadataUnitNames.enum';
import IRequest from 'src/modules/core/interfaces/request.interface';

const CoursesMetadataRequests: IRequest[] = [
	{
		name: MetadataUnitNames.FIO_AGENT,
		request: {
			answer: 'Введите ваши Ф.И.О.',
			dialogueStatus: DialogueStatuses.IN_PROGRESS
		}
	},
	{
		name: MetadataUnitNames.EMAIL,
		request: {
			answer: 'Введите Ваше адрес электронной почты',
			dialogueStatus: DialogueStatuses.IN_PROGRESS
		}
	},
	{
		name: MetadataUnitNames.IS_CONCERTED,
		request: {
			answer: 'Согласованы ли изменения с учеником?',
			dialogueStatus: DialogueStatuses.IN_PROGRESS
		}
	},
	{
		name: MetadataUnitNames.FIO_STUDENT,
		request: {
			answer: 'Введите Ф.И. ученика',
			dialogueStatus: DialogueStatuses.IN_PROGRESS
		}
	},
	{
		name: MetadataUnitNames.REASON_OF_CHANGE,
		request: {
			answer: 'Введите причину изменения программы',
			dialogueStatus: DialogueStatuses.IN_PROGRESS
		}
	},
	{
		name: MetadataUnitNames.NEW_MULTIPLE_LESSONS_DATES,
		request: {
			answer: 'Укажите дни недели и время занятий по новой программе',
			dialogueStatus: DialogueStatuses.IN_PROGRESS
		}
	},
	{
		name: MetadataUnitNames.COURCE_NAME,
		request: {
			answer: 'Введите название курса',
			dialogueStatus: DialogueStatuses.IN_PROGRESS
		}
	},
	{
		name: MetadataUnitNames.NEW_COURCE_NAME,
		request: {
			answer: 'Укажите название курса и предмета по новой программе',
			dialogueStatus: DialogueStatuses.IN_PROGRESS
		}
	},
	{
		name: MetadataUnitNames.DATE_TO_APPLY_CHANGES,
		request: {
			answer: 'Укажите с какой даты проставить занятия в расписание',
			dialogueStatus: DialogueStatuses.IN_PROGRESS
		}
	}
];

export default CoursesMetadataRequests;
