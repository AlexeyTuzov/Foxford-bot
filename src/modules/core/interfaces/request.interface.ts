import MetadataUnitNames from 'src/modules/API/enums/metadataUnitNames.enum';
import IAnswer from 'src/modules/API/interfaces/answer.interface';

export default interface IRequest {
	name: MetadataUnitNames;
	request: IAnswer;
}
