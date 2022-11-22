import Intent from '../../interfaces/intent.interface';
import CommentsIntentsNames from './enums/commentsIntents.enum';

const CommentsIntents: Intent[] = [
	{
		name: CommentsIntentsNames.NO_COMMENT_FROM_PREV_AGENT,
		entities: ['коммент']
	}
];

export default CommentsIntents;
