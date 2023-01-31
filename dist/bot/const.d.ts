import { Context } from "telegraf";
interface sessionData {
    thesub: number;
    durationsub: number;
    message_id: number;
    messageId: number;
}
export interface BotContext extends Context {
    session: sessionData;
}
export {};
