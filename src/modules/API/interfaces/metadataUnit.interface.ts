import MetadataUnitNames from '../enums/metadataUnitNames.enum';

export default interface MetadataUnit {
	name: MetadataUnitNames;
	value: string | boolean;
}
