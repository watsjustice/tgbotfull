import { Context, Scenes } from "telegraf";
import { Update } from "telegraf/typings/core/types/typegram";
import { BotContext } from '../const';
export declare class SceneGenerator {
    reSendMess(): Scenes.BaseScene<Context<Update>>;
    Stages(): Scenes.BaseScene<BotContext>;
    subPayment(): Scenes.BaseScene<BotContext>;
    paymentInfo(): Scenes.BaseScene<BotContext>;
    AccessPayment(): Scenes.BaseScene<BotContext>;
    subStatus(): Scenes.BaseScene<BotContext>;
    remoteQuestions(): Scenes.BaseScene<BotContext>;
    infoAbout(): Scenes.BaseScene<BotContext>;
    AcceptTheSub(): Scenes.BaseScene<BotContext>;
    ReSendAction(): Scenes.BaseScene<BotContext>;
}
