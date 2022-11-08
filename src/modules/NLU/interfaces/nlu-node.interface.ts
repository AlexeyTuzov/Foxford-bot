import Intent from './intent.interface';

export abstract class NluNode {
	abstract detectIntents(message: string): Intent[];
}
