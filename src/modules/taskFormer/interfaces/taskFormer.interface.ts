import IMessage from 'src/modules/API/interfaces/message.interface';

export default abstract class TaskFormerInterface {
	abstract createTask(messageObj: IMessage): void;
}
