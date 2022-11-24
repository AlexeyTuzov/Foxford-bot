import { Injectable } from '@nestjs/common';
import IMessage from 'src/modules/API/interfaces/message.interface';
import TaskFormerInterface from '../interfaces/taskFormer.interface';

@Injectable()
export class TaskFormerService implements TaskFormerInterface {
	createTask(messageObj: IMessage): void {
		console.log('New Task:', messageObj);
	}
}
