"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const scenes_js_1 = require("./scenes.js");
const telegraf_1 = require("telegraf");
const bot = new telegraf_1.Telegraf('5695594281:AAHLeRNeAoLbp0zL3fIvsbVRxgB8Q3T1whg');
const curScene = new scenes_js_1.SceneGenerator();
const opt = curScene.reSendMess();
const ssstage = curScene.Stages();
const subpayment = curScene.subPayment();
const paymentinfo = curScene.paymentInfo();
const accesspayment = curScene.AccessPayment();
const subStatus = curScene.subStatus();
const infoAbout = curScene.infoAbout();
const remoteQuestions = curScene.remoteQuestions();
const AcceptTheSub = curScene.AcceptTheSub();
const resendAction = curScene.ReSendAction();
const stage = new telegraf_1.Scenes.Stage([opt, ssstage, subpayment, paymentinfo, accesspayment, subStatus, remoteQuestions, infoAbout, AcceptTheSub, resendAction]);
bot.use((0, telegraf_1.session)({}), stage.middleware());
bot.start(async (ctx) => {
    await ctx.replyWithHTML(`KO PRIORITY дает доступ к аналитике, идеям и сигналам из приватных  каналов без задержки во времени. ⏱\n\nСхема проста: из канала-источника сообщения пересылаются в канал-копию. И таких зеркальных каналов у нас пара десятков.\n\nСписок актуальных каналов вы можете посмотреть в самом боте. Подойдёт как дополнение к своим идеям.`, {
        reply_markup: {
            one_time_keyboard: true,
            inline_keyboard: [
                [{ text: 'Главное меню', callback_data: 'main menu' }],
            ]
        },
        disable_web_page_preview: true
    });
});
bot.action('main menu', async (ctx) => {
    await ctx.scene.enter('main menu');
});
bot.action('1monthsub', async (ctx) => {
    ctx.session.thesub = 1;
    ctx.session.durationsub = 1;
    await ctx.scene.enter('subpay');
});
bot.action('3monthsub', async (ctx) => {
    ctx.session.thesub = 2;
    ctx.session.durationsub = 3;
    await ctx.scene.enter('subpay');
});
bot.action('12monthsub', async (ctx) => {
    ctx.session.thesub = 3;
    ctx.session.durationsub = 12;
    await ctx.scene.enter('subpay');
});
bot.action('stages', async (ctx) => {
    await ctx.scene.enter('stage');
});
bot.action('paymentinfo', async (ctx) => {
    await ctx.scene.enter('payinfo');
});
bot.action('accesspayment', async (ctx) => {
    await ctx.scene.enter('accesspayment');
});
bot.action('substatus', async (ctx) => {
    await ctx.scene.enter('substatus');
});
bot.action('questions', async (ctx) => {
    await ctx.scene.enter('questions');
});
bot.action('info', async (ctx) => {
    await ctx.scene.enter('info');
});
bot.action('subpay', async (ctx) => {
    await ctx.scene.enter('stage');
});
bot.command('acception', async (ctx) => {
    await ctx.scene.enter('acception');
});
bot.command('q1f8y', async (ctx) => {
    await ctx.scene.enter('q1f8y');
});
await bot.launch();
//# sourceMappingURL=const.js.map