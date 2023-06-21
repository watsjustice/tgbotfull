import {session, Telegraf, Scenes, Context} from "telegraf";
import * as dotenv from 'dotenv';
import { MainMenuScene } from "./bot/scenes/menu/main_menu_scene";
import { TariffStages } from "./bot/scenes/tariff/tariff_stages";
import { SubscriptionCheck } from "./bot/scenes/subscription.ts/sub_status";
import { ThirdPointThings } from "./bot/scenes/other_stuff.ts/info_and_questions";
import { AdmingCommands } from "./bot/scenes/AdminCommands/admin_commands";
dotenv.config();

interface sessionData {
    thesub: number,
    durationsub: number,
    message_id: number,
    messageId: number,
}

export interface BotContext extends Context {
    session: sessionData,
}

const bot = new Telegraf<BotContext>('5658571260:AAHlHRz0NeQYgjFH6mj4qNT26SUjuIU-zME')

const MenuSceneControl : MainMenuScene = new MainMenuScene()
const tariffSceneControl : TariffStages = new TariffStages()
const oddStuff : ThirdPointThings = new ThirdPointThings()
const adminCommand : AdmingCommands = new AdmingCommands()
const sub : SubscriptionCheck = new SubscriptionCheck()

const MainMenu : any = MenuSceneControl.MenuFunc()
const tariffCatalog : any = tariffSceneControl.catalog()
const tariffPayment : any = tariffSceneControl.payment()
const tariffAccess : any = tariffSceneControl.access()
const tariffBill : any = tariffSceneControl.billCheck()
const subStatus : any = sub.subCheck()
const infoAbout : any = oddStuff.information()
const remoteQuestions : any = oddStuff.askYourQuestion()
const AcceptTheSub : any = adminCommand.AcceptTheSub()
const resendAction : any = adminCommand.reSendMess()

const stage : any = new Scenes.Stage([
    MainMenu,
    tariffCatalog,
    tariffPayment,
    tariffAccess,
    tariffBill,
    subStatus,
    remoteQuestions,
    infoAbout,
    AcceptTheSub,
    resendAction
]);


bot.use(session({}), stage.middleware());


bot.start(async (ctx:any) => {

    let text = 'KO PRIORITY дает доступ к аналитике, идеям и сигналам из приватных  каналов без задержки во времени. ⏱\n\nСхема проста: из канала-источника сообщения пересылаются в канал-копию. И таких зеркальных каналов у нас пара десятков.\n\nСписок актуальных каналов вы можете посмотреть в самом боте. Подойдёт как дополнение к своим идеям' 
    await ctx.reply(
        text,
        {
            reply_markup : {
                one_time_keyboard: true,
                inline_keyboard: [
                    [{text:'Главное меню',callback_data: 'main menu'}],
                ]
        },
    })}
)


bot.action('main menu', async (ctx : any) => {
    await ctx.scene.enter('main menu');
})

bot.action('1monthsub', async (ctx : any) => {
    ctx.session.thesub = 1
    ctx.session.durationsub = 1
    await ctx.scene.enter('subpay');
})
bot.action('3monthsub', async (ctx : any) => {
    ctx.session.thesub = 2
    ctx.session.durationsub = 3
    await ctx.scene.enter('subpay');
})
bot.action('12monthsub', async (ctx : any) => {
    ctx.session.thesub = 3
    ctx.session.durationsub = 12
    await ctx.scene.enter('subpay');
})

bot.action('sale', async (ctx : any) => {
    ctx.session.thesub = 4
    ctx.session.durationsub = 1
    await ctx.scene.enter('subpay') 
})

bot.action('stages', async (ctx : any) => {
    await ctx.scene.enter('stage');
})

bot.action('paymentinfo', async (ctx : any) => {
    await ctx.scene.enter('payinfo');
})

bot.action('accesspayment', async (ctx : any) => {
    await ctx.scene.enter('accesspayment');
})

bot.action('substatus', async (ctx : any) => {
    await ctx.scene.enter('substatus');
})

bot.action('questions', async (ctx : any) => {
    await ctx.scene.enter('questions');
})

bot.action('info', async (ctx : any) => {
    await ctx.scene.enter('info');
})

bot.action('subpay', async (ctx : any) => {
    await ctx.scene.enter('stage');
})

bot.command('acception', async (ctx : any) => {
    await ctx.scene.enter('acception')
})

bot.command('q1f8y', async (ctx : any) => {
    await ctx.scene.enter('q1f8y')
})




bot.launch();


