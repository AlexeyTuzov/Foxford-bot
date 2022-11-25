import DialogueStatuses from 'src/modules/API/enums/dialogueStatus.enum';
import MetadataUnitNames from 'src/modules/API/enums/metadataUnitNames.enum';
import IRequest from 'src/modules/core/interfaces/request.interface';

const CommentsMetadataRequests: IRequest[] = [
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
		name: MetadataUnitNames.FIO_STUDENT,
		request: {
			answer: 'Введите Ф.И. ученика',
			dialogueStatus: DialogueStatuses.IN_PROGRESS
		}
	},
	{
		name: MetadataUnitNames.NEW_SINGLE_LESSON_DATE,
		request: {
			answer: 'Введите дату и время Вашего ближайшего урока',
			dialogueStatus: DialogueStatuses.IN_PROGRESS
		}
	}
];

export default CommentsMetadataRequests;
