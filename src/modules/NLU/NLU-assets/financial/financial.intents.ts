import Intent from '../../interfaces/intent.interface';
import FinancialIntentsNames from './enums/financialIntents.enum';

const FinancialIntents: Intent[] = [
	{
		name: FinancialIntentsNames.DOCS_CHANGE,
		entities: [
			'реквизит',
			'банк',
			'документ',
			'изменил',
			'изменен',
			'сменил',
			'замен',
			'поменя'
		]
	},
	{
		name: FinancialIntentsNames.NO_ACT,
		entities: ['акт']
	},
	{
		name: FinancialIntentsNames.NO_BONUS,
		entities: ['бонус']
	},
	{
		name: FinancialIntentsNames.NO_SALARY,
		entities: ['зарплат', 'заработ', 'плата', 'деньги']
	},
	{
		name: FinancialIntentsNames.SELF_EMPLOYEED,
		entities: ['пеня', 'пени', 'штраф', 'налог', 'чек', 'самозанят']
	}
];

export default FinancialIntents;
