import { Scenes } from "telegraf";
import { BotContext } from '../const';
export declare class SceneGenerator {
    reSendMess(): any;
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
