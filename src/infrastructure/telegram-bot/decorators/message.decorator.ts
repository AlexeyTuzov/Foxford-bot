import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import ITelegramMessage from "../interface/telegram.interface";

const TGMessage = createParamDecorator((data: unknown, ctx: ExecutionContext) => {

    try {
        const argsArray: any[] = ctx.getArgs();
        const messageObject: ITelegramMessage | any = {...argsArray}[0];
        const messageText = messageObject.update.message.text;
        return messageText;
    } catch (err) {
        throw new Error('Error reading message text');
    }
    
});

export default TGMessage;