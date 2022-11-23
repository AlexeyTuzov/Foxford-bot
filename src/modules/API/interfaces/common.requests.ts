import IRequest from 'src/modules/core/interfaces/request.interface';
import DialogueStatuses from '../enums/dialogueStatus.enum';
import MetadataUnitNames from '../enums/metadataUnitNames.enum';

const CommonRequests: IRequest[] = [
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
	}
];

export default CommonRequests;
