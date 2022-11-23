import DialogueStatuses from 'src/modules/API/enums/dialogueStatus.enum';
import MetadataUnitNames from 'src/modules/API/enums/metadataUnitNames.enum';
import IRequest from 'src/modules/core/interfaces/request.interface';

const StudentsMetadataRequests: IRequest[] = [
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
		name: MetadataUnitNames.DATE,
		request: {
			answer: 'Введите дату и время урока',
			dialogueStatus: DialogueStatuses.IN_PROGRESS
		}
	},
	{
		name: MetadataUnitNames.REASON_OF_CHANGE,
		request: {
			answer: 'Укажите причину',
			dialogueStatus: DialogueStatuses.IN_PROGRESS
		}
	},
	{
		name: MetadataUnitNames.TEXT,
		request: {
			answer: 'Опишите Ваш запрос',
			dialogueStatus: DialogueStatuses.IN_PROGRESS
		}
	}
];

export default StudentsMetadataRequests;
