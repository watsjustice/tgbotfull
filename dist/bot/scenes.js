"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SceneGenerator = void 0;
const telegraf_1 = require("telegraf");
const user_entity_1 = require("../entities/user_entity");
class SceneGenerator {
    reSendMess() {
        const message = new telegraf_1.Scenes.BaseScene('main menu');
        message.enter(async (ctx) => {
            const user = await user_entity_1.User.query().findById(ctx.from.id).returning('*');
            if (!user) {
                await user_entity_1.User.query().insert({
                    id: ctx.from.id,
                    status: false,
                });
            }
            if (ctx.session.message_id) {
            }
            else {
                ctx.session.message_id = NaN;
            }
            if (!ctx.session.message_id) {
                const { message_id } = await ctx.replyWithHTML('<b>Главое меню</b>', {
                    reply_markup: {
                        one_time_keyboard: true,
                        inline_keyboard: [
                            [
                                { text: '💲Тарифы', callback_data: 'stages' }
                            ],
                            [{ text: '🕛Подписка', callback_data: 'substatus' }],
                            [{ text: '❓Вопросы', callback_data: 'questions' }],
                            [{ text: '📌Подробнее о сервисе', callback_data: 'info' }],
                        ]
                    },
                    disable_web_page_preview: true,
                    parse_mode: 'HTML'
                });
                ctx.session.message_id = message_id;
            }
            else {
                try {
                    const { message_id } = await ctx.telegram.editMessageText(ctx.chat.id, ctx.session.message_id, 0, '<b>Главое меню</b>', {
                        reply_markup: {
                            one_time_keyboard: true,
                            inline_keyboard: [
                                [
                                    { text: '💲Тарифы', callback_data: 'stages' }
                                ],
                                [{ text: '🕛Подписка', callback_data: 'substatus' }],
                                [{ text: '❓Вопросы', callback_data: 'questions' }],
                                [{ text: '📌Подробнее о сервисе', callback_data: 'info' }],
                            ]
                        },
                        disable_web_page_preview: true,
                        parse_mode: 'HTML'
                    });
                    ctx.session.message_id = message_id;
                }
                catch (_a) {
                }
            }
        });
        return message;
    }
    Stages() {
        const stage = new telegraf_1.Scenes.BaseScene('stage');
        stage.enter(async (ctx) => {
            if (!ctx.session.message_id) {
                const { message_id } = await ctx.replyWithHTML("\u0427\u0442\u043E\u0431\u044B \u043E\u0437\u043D\u0430\u043A\u043E\u043C\u0438\u0442\u044C\u0441\u044F \u0441 \u0442\u0430\u0440\u0438\u0444\u043E\u043C, \u0432\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043D\u0435\u043E\u0431\u0445\u043E\u0434\u0438\u043C\u044B\u0439, \u043D\u0430\u0436\u0430\u0432 \u043D\u0430 \u0441\u043E\u043E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0443\u044E\u0449\u0443\u044E \u043A\u043D\u043E\u043F\u043A\u0443", {
                    reply_markup: {
                        one_time_keyboard: true,
                        inline_keyboard: [
                            [
                                { text: '✅1 месяц за 1490', callback_data: '1monthsub' }
                            ],
                            [{ text: '✅3 месяца за 3990', callback_data: '3monthsub' }],
                            [{ text: '✅12 месяцев за 14990', callback_data: '12monthsub' }],
                        ]
                    },
                    disable_web_page_preview: true,
                    parse_mode: 'HTML'
                });
                ctx.session.message_id = message_id;
            }
            else {
                const { message_id } = await ctx.telegram.editMessageText(ctx.chat.id, ctx.session.message_id, 0, "\u0427\u0442\u043E\u0431\u044B \u043E\u0437\u043D\u0430\u043A\u043E\u043C\u0438\u0442\u044C\u0441\u044F \u0441 \u0442\u0430\u0440\u0438\u0444\u043E\u043C, \u0432\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043D\u0435\u043E\u0431\u0445\u043E\u0434\u0438\u043C\u044B\u0439, \u043D\u0430\u0436\u0430\u0432 \u043D\u0430 \u0441\u043E\u043E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0443\u044E\u0449\u0443\u044E \u043A\u043D\u043E\u043F\u043A\u0443", {
                    reply_markup: {
                        one_time_keyboard: true,
                        inline_keyboard: [
                            [
                                { text: '✅1 месяц за 1490', callback_data: '1monthsub' }
                            ],
                            [{ text: '✅3 месяца за 3990', callback_data: '3monthsub' }],
                            [{ text: '✅12 месяцев за 14990', callback_data: '12monthsub' }],
                        ]
                    },
                    disable_web_page_preview: true,
                    parse_mode: 'HTML'
                });
                ctx.session.message_id = message_id;
            }
        });
        return stage;
    }
    subPayment() {
        const payment = new telegraf_1.Scenes.BaseScene('subpay');
        payment.enter(async (ctx) => {
            let text = '';
            switch (ctx.session.thesub) {
                case 1:
                    text = "\u0422\u0430\u0440\u0438\u0444: \uD83D\uDD10 1 \u043C\u0435\u0441\u044F\u0446 \u0437\u0430 1490\u20BD \uD83C\uDF9F\uFE0F\n\u0421\u0442\u043E\u0438\u043C\u043E\u0441\u0442\u044C: 10.00 \uD83C\uDDF7\uD83C\uDDFARUB\n\u0421\u0440\u043E\u043A \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u044F: 31 \u0434\u043D\u0435\u0439";
                    break;
                case 2:
                    text = "\u0422\u0430\u0440\u0438\u0444: \uD83D\uDD10 3 \u043C\u0435\u0441\u044F\u0446 \u0437\u0430 3990\u20BD \uD83C\uDF9F\uFE0F\n\u0421\u0442\u043E\u0438\u043C\u043E\u0441\u0442\u044C: 10.00 \uD83C\uDDF7\uD83C\uDDFARUB\n\u0421\u0440\u043E\u043A \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u044F: 31 \u0434\u043D\u0435\u0439";
                    break;
                case 3:
                    text = "\u0422\u0430\u0440\u0438\u0444: \uD83D\uDD10 12 \u043C\u0435\u0441\u044F\u0446td \u0437\u0430 14490\u20BD \uD83C\uDF9F\uFE0F\n\u0421\u0442\u043E\u0438\u043C\u043E\u0441\u0442\u044C: 10.00 \uD83C\uDDF7\uD83C\uDDFARUB\n\u0421\u0440\u043E\u043A \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u044F: 31 \u0434\u043D\u0435\u0439";
                    break;
            }
            if (!ctx.session.message_id) {
                const { message_id } = await ctx.replyWithHTML(text, {
                    reply_markup: {
                        one_time_keyboard: true,
                        inline_keyboard: [
                            [
                                { text: '💵Оплатить', callback_data: 'paymentinfo' }
                            ],
                        ]
                    },
                    disable_web_page_preview: true,
                    parse_mode: 'HTML'
                });
                ctx.session.message_id = message_id;
            }
            else {
                const { message_id } = await ctx.telegram.editMessageText(ctx.chat.id, ctx.session.message_id, 0, text, {
                    reply_markup: {
                        one_time_keyboard: true,
                        inline_keyboard: [
                            [
                                { text: '💵Оплатить', callback_data: 'paymentinfo' }
                            ],
                        ]
                    },
                    disable_web_page_preview: true,
                    parse_mode: 'HTML'
                });
                ctx.session.message_id = message_id;
            }
        });
        return payment;
    }
    paymentInfo() {
        const info = new telegraf_1.Scenes.BaseScene('payinfo');
        info.enter(async (ctx) => {
            let text = "\u0421\u043F\u043E\u0441\u043E\u0431 \u043E\u043F\u043B\u0430\u0442\u044B: \u0422\u0438\u043D\u044C\u043A\u043E\u0444\u0444/\u0421\u0431\u0435\u0440/\u0410\u043B\u044C\u0444\u0430\n\u041A \u043E\u043F\u043B\u0430\u0442\u0435: 10.00 \uD83C\uDDF7\uD83C\uDDFARUB\n\u0412\u0430\u0448 ID: ${ctx.chat.id}\n\u0420\u0435\u043A\u0432\u0438\u0437\u0438\u0442\u044B \u0434\u043B\u044F \u043E\u043F\u043B\u0430\u0442\u044B:\n\n\u041F\u0435\u0440\u0435\u0432\u043E\u0434 \u0441\u043E\u0433\u043B\u0430\u0441\u043D\u043E \u0442\u0430\u0440\u0438\u0444\u0443 \u043A\u043E\u0442\u043E\u0440\u044B\u0439 \u0432\u044B\u0431\u0440\u0430\u043B\u0438:\n\uD83D\uDC9A1 \u043C\u0435\u0441\u044F\u0446 - 1.490\n\uD83D\uDC9A3 \u043C\u0435\u0441\u044F\u0446\u0430 - 3.990\n\uD83D\uDC9A1 \u0433\u043E\u0434 - 14.990\n----------------------------------\n\u041D\u043E\u043C\u0435\u0440 \u043A\u0430\u0440\u0442\u044B \u0434\u043B\u044F \u043F\u0435\u0440\u0435\u0432\u043E\u0434\u0430:\n\uD83D\uDCB34890494776467862(\uD83E\uDD5DQIWI) \u2705\n----------------------------------\n\u041F\u0415\u0420\u0415\u0412\u041E\u0414 \u041D\u0410 \u0421\u0411\u0415\u0420 \u0438 \u0422\u0418\u041D\u042C\u041A\u041E\u0424\u0424 \u0414\u041E\u0421\u0422\u0423\u041F\u0415\u041D \u0422\u041E\u041B\u042C\u041A\u041E \u0414\u041B\u042F \u0421\u0422\u0410\u0420\u042B\u0425 \u041F\u041E\u041B\u042C\u0417\u041E\u0412\u0410\u0422\u0415\u041B\u0415\u0419\n(\u2757\u041A\u0422\u041E \u0420\u0410\u041D\u0415\u0415  \u0411\u0420\u0410\u041B \u041F\u041E\u0414\u041F\u0418\u0421\u041A\u0423\u2757)\n----------------------------------\n\u26A0\uFE0F\u0412\u0441\u0435 \u043F\u0435\u0440\u0435\u0432\u043E\u0434\u044B \u043F\u0440\u043E\u0432\u0435\u0440\u044F\u044E\u0442\u0441\u044F \u0432 \u0440\u0443\u0447\u043D\u0443\u044E \u0430\u0434\u043C\u0438\u043D\u043E\u043C \u26A0\uFE0F\n\uD83D\uDD10\u041E\u043F\u043B\u0430\u0442\u0438\u0432 \u043D\u0435 \u0437\u0430\u0431\u0443\u0434\u044C\u0442\u0435 \u043F\u0440\u0438\u043A\u0440\u0435\u043F\u0438\u0442\u044C \u0447\u0435\u043A \u0431\u043E\u0442\u0443. \n\u041F\u043E \u0432\u0441\u0435\u043C \u0432\u043E\u043F\u0440\u043E\u0441\u0430\u043C:\n\n\u260E\uFE0F @KO_PRIORITYHELPER_BOT\n__________________________\n";
            const { message_id } = await ctx.telegram.editMessageText(ctx.chat.id, ctx.session.message_id, 0, text, {
                reply_markup: {
                    one_time_keyboard: true,
                    inline_keyboard: [
                        [
                            { text: '✅Я оплатил', callback_data: 'accesspayment' }
                        ],
                    ]
                },
                disable_web_page_preview: true,
                parse_mode: 'HTML'
            });
            ctx.session.message_id = message_id;
        });
        return info;
    }
    AccessPayment() {
        const access = new telegraf_1.Scenes.BaseScene('accesspayment');
        let text;
        access.enter(async (ctx) => {
            let text = "\uD83D\uDC81\uD83C\uDFFB\u200D\u2642\uFE0F <b>\u041E\u043F\u043B\u0430\u0442\u0438\u043B\u0438?</b>\n\n\uD83D\uDC4C\uD83C\uDFFB \u0422\u043E\u0433\u0434\u0430 \u043E\u0442\u043F\u0440\u0430\u0432\u044C\u0442\u0435 \u0441\u044E\u0434\u0430 \u043A\u0430\u0440\u0442\u0438\u043D\u043A\u043E\u0439 (\u043D\u0435 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u043E\u043C!) \u043A\u0432\u0438\u0442\u0430\u043D\u0446\u0438\u044E \u043F\u043B\u0430\u0442\u0435\u0436\u0430: \u0441\u043A\u0440\u0438\u043D\u0448\u043E\u0442 \u0438\u043B\u0438 \u0444\u043E\u0442\u043E.\n\n\u041D\u0430 \u043A\u0432\u0438\u0442\u0430\u043D\u0446\u0438\u0438 \u0434\u043E\u043B\u0436\u043D\u044B \u0431\u044B\u0442\u044C \u0447\u0435\u0442\u043A\u043E \u0432\u0438\u0434\u043D\u044B: \u0434\u0430\u0442\u0430, \u0432\u0440\u0435\u043C\u044F \u0438 \u0441\u0443\u043C\u043C\u0430 \u043F\u043B\u0430\u0442\u0435\u0436\u0430.\n__________________________\n<b>\u0417\u0430 \u0441\u043F\u0430\u043C \u0432\u044B \u043C\u043E\u0436\u0435\u0442\u0435 \u0431\u044B\u0442\u044C \u0437\u0430\u0431\u043B\u043E\u043A\u0438\u0440\u043E\u0432\u0430\u043D\u044B!</b>";
            const { message_id } = await ctx.telegram.editMessageText(ctx.chat.id, ctx.session.message_id, 0, text, {
                reply_markup: {
                    one_time_keyboard: true,
                    inline_keyboard: [
                        [
                            { text: '❌Отмена', callback_data: 'main menu' }
                        ],
                    ]
                },
                disable_web_page_preview: true,
                parse_mode: 'HTML'
            });
            ctx.session.message_id = message_id;
        });
        access.on('photo', async (ctx) => {
            await ctx.telegram.sendPhoto(1177303799, ctx.message.photo[ctx.message.photo.length - 1].file_id, { caption: `${ctx.chat.id}\n${ctx.session.durationsub} ` });
            await ctx.telegram.deleteMessage(ctx.chat.id, ctx.session.message_id);
            let text = "\u2705 \u041A\u0432\u0438\u0442\u0430\u043D\u0446\u0438\u044F \u043E\u0442\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0430 \u043E\u043F\u0435\u0440\u0430\u0442\u043E\u0440\u0443!\n\n\u041A\u0430\u043A \u0442\u043E\u043B\u044C\u043A\u043E \u043C\u044B \u043F\u0440\u043E\u0432\u0435\u0440\u0438\u043C \u043F\u043B\u0430\u0442\u0451\u0436 - \u0443 \u0412\u0430\u0441 \u0430\u043A\u0442\u0438\u0432\u0438\u0440\u0443\u0435\u0442\u0441\u044F \u043F\u043E\u0434\u043F\u0438\u0441\u043A\u0430! \u041E\u0436\u0438\u0434\u0430\u0439\u0442\u0435 ;)";
            await ctx.telegram.deleteMessage(ctx.chat.id, ctx.message.message_id);
            const { message_id } = await ctx.replyWithHTML(text, {
                reply_markup: {
                    one_time_keyboard: true,
                    inline_keyboard: [
                        [
                            { text: 'Главное меню', callback_data: 'main menu' }
                        ],
                    ]
                },
                disable_web_page_preview: true,
                parse_mode: 'HTML'
            });
            ctx.session.message_id = message_id;
        });
        return access;
    }
    subStatus() {
        const sub = new telegraf_1.Scenes.BaseScene('substatus');
        let status = [0];
        sub.enter(async (ctx) => {
            let text = '';
            const user = await user_entity_1.User.query().findById(ctx.chat.id).returning('status');
            if (!ctx.session.message_id) {
                const { message_id } = await ctx.replyWithHTML(text, {
                    reply_markup: {
                        one_time_keyboard: true,
                        inline_keyboard: [
                            [
                                { text: '💲Тарифы', callback_data: 'subpay' }
                            ],
                            [{ text: 'Назад', callback_data: 'main menu' }],
                        ]
                    },
                    disable_web_page_preview: true,
                    parse_mode: 'HTML'
                });
                ctx.session.message_id = message_id;
            }
            else {
                const { message_id } = await ctx.telegram.editMessageText(ctx.chat.id, ctx.session.message_id, 0, text, {
                    reply_markup: {
                        one_time_keyboard: true,
                        inline_keyboard: [
                            [
                                { text: '💲Тарифы', callback_data: 'subpay' }
                            ],
                            [{ text: 'Назад', callback_data: 'main menu' }],
                        ]
                    },
                    disable_web_page_preview: true,
                    parse_mode: 'HTML'
                });
                ctx.session.message_id = message_id;
            }
        });
        return sub;
    }
    remoteQuestions() {
        const q = new telegraf_1.Scenes.BaseScene('questions');
        q.enter(async (ctx) => {
            let text = "\u2699\uFE0F\u041F\u043E \u0432\u0441\u0435\u043C \u0432\u043E\u043F\u0440\u043E\u0441\u0430\u043C:\n@KO_PriorityHelper_Bot";
            if (!ctx.session.message_id) {
                const { message_id } = await ctx.replyWithHTML(text, {
                    reply_markup: {
                        one_time_keyboard: true,
                        inline_keyboard: [
                            [
                                { text: 'Назад', callback_data: 'main menu' }
                            ],
                        ]
                    },
                    disable_web_page_preview: true,
                    parse_mode: 'HTML'
                });
                ctx.session.message_id = message_id;
            }
            else {
                const { message_id } = await ctx.telegram.editMessageText(ctx.chat.id, ctx.session.message_id, 0, text, {
                    reply_markup: {
                        one_time_keyboard: true,
                        inline_keyboard: [
                            [
                                { text: 'Назад', callback_data: 'main menu' }
                            ],
                        ]
                    },
                    disable_web_page_preview: true,
                    parse_mode: 'HTML'
                });
                ctx.session.message_id = message_id;
            }
        });
        return q;
    }
    infoAbout() {
        const info = new telegraf_1.Scenes.BaseScene('info');
        info.enter(async (ctx) => {
            let text = "\uD83D\uDFE2 \u0421 \u043F\u043E\u043C\u043E\u0449\u044C\u044E \u0441\u0435\u0440\u0432\u0438\u0441\u0430 \u0412\u0430\u043C \u043F\u043E\u043B\u043D\u043E\u0446\u0435\u043D\u043D\u043E (\u0431\u043B\u0430\u0433\u043E\u0434\u0430\u0440\u044F \u0430\u0432\u0442\u043E\u043F\u0435\u0440\u0435\u0441\u044B\u043B\u043A\u0435, \u0431\u0435\u0437 \u0437\u0430\u0434\u0435\u0440\u0436\u043A\u0438) \u0431\u0443\u0434\u0443\u0442 \u0434\u043E\u0441\u0442\u0443\u043F\u043D\u044B \u0438\u0434\u0435\u0438 \u0438 \u0441\u0438\u0433\u043D\u0430\u043B\u044B \u0441\u0440\u0430\u0437\u0443 \u0438\u0437 20+ \u043A\u0430\u043D\u0430\u043B\u043E\u0432\n\n\u2139\uFE0F\u041F\u043E\u043B\u043D\u044B\u0439 \u0441\u043F\u0438\u0441\u043E\u043A \u043A\u0430\u043D\u0430\u043B\u043E\u0432 \u0432\u044B \u043C\u043E\u0436\u0435\u0442\u0435 \u0443\u0437\u043D\u0430\u0442\u044C \u0442\u0443\u0442: https://teletype.in/@ko_priority/list\n\n\u00A9\uFE0F\u041C\u044B \u043F\u043E\u0441\u0442\u043E\u044F\u043D\u043D\u043E \u0438\u0449\u0435\u043C \u043D\u043E\u0432\u044B\u0435 \u043A\u0430\u043D\u0430\u043B\u044B \u0438 \u043E\u0441\u0442\u0430\u0432\u043B\u044F\u0435\u043C \u0443 \u0441\u0435\u0431\u044F \u0432 \u043F\u043E\u0434\u0431\u043E\u0440\u043A\u0435 \u043B\u0443\u0447\u0448\u0438\u0445 \u0438\u0437 \u043B\u0443\u0447\u0448\u0438\u0445, \u0443\u0434\u0430\u043B\u044F\u044F \u0442\u0435\u0445, \u043A\u0442\u043E \u043D\u0435 \u044D\u0444\u0444\u0435\u043A\u0442\u0438\u0432\u0435\u043D";
            if (!ctx.session.message_id) {
                const { message_id } = await ctx.replyWithHTML(text, {
                    reply_markup: {
                        one_time_keyboard: true,
                        inline_keyboard: [
                            [
                                { text: 'Назад', callback_data: 'main menu' }
                            ],
                        ]
                    },
                    disable_web_page_preview: true,
                    parse_mode: 'HTML'
                });
                ctx.session.message_id = message_id;
            }
            else {
                const { message_id } = await ctx.telegram.editMessageText(ctx.chat.id, ctx.session.message_id, 0, text, {
                    reply_markup: {
                        one_time_keyboard: true,
                        inline_keyboard: [
                            [
                                { text: 'Назад', callback_data: 'main menu' }
                            ],
                        ]
                    },
                    disable_web_page_preview: true,
                    parse_mode: 'HTML'
                });
            }
        });
        return info;
    }
    AcceptTheSub() {
        const acc = new telegraf_1.Scenes.BaseScene('acception');
        acc.enter(async (ctx) => {
            await ctx.replyWithHTML('<b>Введите id пользователя</b>');
        });
        acc.on('text', async (ctx) => {
            try {
                await user_entity_1.User.query().findById(ctx.message.text).patch({
                    status: true,
                });
                await ctx.telegram.sendMessage(ctx.message.text, '✅Ваша заявка была одобрена', {
                    disable_web_page_preview: true,
                    parse_mode: 'HTML'
                });
            }
            catch (_a) {
                await ctx.replyWithHTML('<b>Неверный id</b>');
            }
            let date = new Date();
            await user_entity_1.User.query().findById(ctx.message.text).patch({
                date: String(date.getFullYear()) + '-' + '0' + String(date.getMonth() + 1) + '-' + String(date.getDate()),
                duration: ctx.session.durationsub,
            });
            await ctx.scene.leave();
        });
        return acc;
    }
    ReSendAction() {
        const messages = new telegraf_1.Scenes.BaseScene('q1f8y');
        messages.enter(async (ctx) => {
            await ctx.replyWithHTML('Отправьте сообщение для пересылки');
        });
        messages.on('text', async (ctx) => {
            ctx.session.messageId = ctx.message.message_id;
            const userData = await user_entity_1.User.query().returning('*');
            for (let item in userData) {
                let dat = new Date();
                let theDateOfTheStart = new Date(userData[item].date);
                dat = new Date(String(dat.getFullYear()) + '-' + '0' + String(dat.getMonth() + 1) + '-' + String(dat.getDate()));
                if (+theDateOfTheStart - +dat > 24 * 60 * 60 * 1000 * userData[item].duration * 10) {
                    ctx.telegram.sendMessage(userData[item].id, 'Ваша подписка истекла.');
                }
                else {
                    ctx.telegram.copyMessage(userData[item].id, ctx.chat.id, ctx.session.messageId);
                }
            }
            await ctx.scene.leave();
        });
        messages.on('photo', async (ctx) => {
            ctx.session.messageId = ctx.message.message_id;
            const userData = await user_entity_1.User.query().returning('*');
            for (let item in userData) {
                let dat = new Date();
                let theDateOfTheStart = new Date(userData[item].date);
                dat = new Date(String(dat.getFullYear()) + '-' + '0' + String(dat.getMonth() + 1) + '-' + String(dat.getDate()));
                if (+theDateOfTheStart - +dat > 24 * 60 * 60 * 1000 * userData[item].duration * 10) {
                    ctx.telegram.sendMessage(userData[item].id, 'Ваша подписка истекла.');
                }
                else {
                    ctx.telegram.copyMessage(userData[item].id, ctx.chat.id, ctx.session.messageId);
                }
            }
            await ctx.scene.leave();
        });
        return messages;
    }
}
exports.SceneGenerator = SceneGenerator;
//# sourceMappingURL=scenes.js.map