import Intent from "../../interfaces/intent.interface";
import CommentIntentsNames from "./enums/commentIntents.enum";

const CommentIntents: Intent[] = [
    {
        name: CommentIntentsNames.NO_COMMENT_FROM_PREV_AGENT,
        entities: ['коммент']
    }
];