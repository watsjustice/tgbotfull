import {SceneGenerator} from "./scenes.js";
import {session, Telegraf, Scenes, Context} from "telegraf";

interface sessionData {
    thesub: number,
    durationsub: number,
    message_id: number,
    messageId: number,
}

export interface BotContext extends Context {
    session: sessionData,
}

const bot = new Telegraf<BotContext>('5695594281:AAHLeRNeAoLbp0zL3fIvsbVRxgB8Q3T1whg');
const curScene : SceneGenerator = new SceneGenerator()
const opt : any = curScene.reSendMess()
const ssstage : any = curScene.Stages()
const subpayment : any = curScene.subPayment()
const paymentinfo : any = curScene.paymentInfo()
const accesspayment : any = curScene.AccessPayment()
const subStatus : any = curScene.subStatus()
const infoAbout : any = curScene.infoAbout()
const remoteQuestions : any = curScene.remoteQuestions()
const AcceptTheSub : any = curScene.AcceptTheSub()
const resendAction : any = curScene.ReSendAction()


const stage : any = new Scenes.Stage([opt,ssstage,subpayment,paymentinfo,accesspayment,subStatus,remoteQuestions,infoAbout,AcceptTheSub,resendAction]);




bot.use(session({}), stage.middleware());


bot.start(async ctx => {
    await ctx.replyWithHTML(`KO PRIORITY дает доступ к аналитике, идеям и сигналам из приватных  каналов без задержки во времени. ⏱\n\nСхема проста: из канала-источника сообщения пересылаются в канал-копию. И таких зеркальных каналов у нас пара десятков.\n\nСписок актуальных каналов вы можете посмотреть в самом боте. Подойдёт как дополнение к своим идеям.`, 
        {
        reply_markup: {
            one_time_keyboard: true,
            inline_keyboard: [
                [{text:'Главное меню',callback_data: 'main menu'}],
            ]
        },
        disable_web_page_preview: true
    })
})


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




await bot.launch()


