import DialogueStatuses from 'src/modules/API/enums/dialogueStatus.enum';
import MetadataUnitNames from 'src/modules/API/enums/metadataUnitNames.enum';
import IRequest from 'src/modules/core/interfaces/request.interface';

const FinancialMetadataRequests: IRequest[] = [
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
		name: MetadataUnitNames.REMIND_TEN_DAYS,
		request: {
			answer:
				'Напоминаем, что выплаты и отправка актов производятся в течение 10 рабочих дней с начала месяца. Этот срок уже прошёл?',
			dialogueStatus: DialogueStatuses.IN_PROGRESS
		}
	},
	{
		name: MetadataUnitNames.PERIOD,
		request: {
			answer: 'За какой период?',
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
		name: MetadataUnitNames.TEXT,
		request: {
			answer: 'Опишите Ваш запрос подробнее',
			dialogueStatus: DialogueStatuses.IN_PROGRESS
		}
	}
];

export default FinancialMetadataRequests;
