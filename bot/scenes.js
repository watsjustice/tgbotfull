"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.SceneGenerator = void 0;
var telegraf_1 = require("telegraf");
var knexfile_js_1 = require("../knexfile.js");
var knex_1 = require("knex");
var user_entity_js_1 = require("../entities/user_entity.js");
var objection_1 = require("objection");
objection_1.Model.knex((0, knex_1["default"])(knexfile_js_1["default"].development));
var SceneGenerator = /** @class */ (function () {
    function SceneGenerator() {
    }
    SceneGenerator.prototype.reSendMess = function () {
        var _this = this;
        var message = new telegraf_1.Scenes.BaseScene('main menu');
        message.enter(function (ctx) { return __awaiter(_this, void 0, void 0, function () {
            var user, message_id, message_id, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, user_entity_js_1.User.query().findById(ctx.from.id).returning('*')];
                    case 1:
                        user = _b.sent();
                        if (!!user) return [3 /*break*/, 3];
                        return [4 /*yield*/, user_entity_js_1.User.query().insert({
                                id: ctx.from.id,
                                status: false
                            })];
                    case 2:
                        _b.sent();
                        _b.label = 3;
                    case 3:
                        if (ctx.session.message_id) {
                        }
                        else {
                            ctx.session.message_id = NaN;
                        }
                        if (!!ctx.session.message_id) return [3 /*break*/, 5];
                        return [4 /*yield*/, ctx.replyWithHTML('<b>Главое меню</b>', {
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
                            })];
                    case 4:
                        message_id = (_b.sent()).message_id;
                        ctx.session.message_id = message_id;
                        return [3 /*break*/, 8];
                    case 5:
                        _b.trys.push([5, 7, , 8]);
                        return [4 /*yield*/, ctx.telegram.editMessageText(ctx.chat.id, ctx.session.message_id, 0, '<b>Главое меню</b>', {
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
                            })];
                    case 6:
                        message_id = (_b.sent()).message_id;
                        ctx.session.message_id = message_id;
                        return [3 /*break*/, 8];
                    case 7:
                        _a = _b.sent();
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/];
                }
            });
        }); });
        return message;
    };
    SceneGenerator.prototype.Stages = function () {
        var _this = this;
        var stage = new telegraf_1.Scenes.BaseScene('stage');
        stage.enter(function (ctx) { return __awaiter(_this, void 0, void 0, function () {
            var message_id, message_id;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!ctx.session.message_id) return [3 /*break*/, 2];
                        return [4 /*yield*/, ctx.replyWithHTML("\u0427\u0442\u043E\u0431\u044B \u043E\u0437\u043D\u0430\u043A\u043E\u043C\u0438\u0442\u044C\u0441\u044F \u0441 \u0442\u0430\u0440\u0438\u0444\u043E\u043C, \u0432\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043D\u0435\u043E\u0431\u0445\u043E\u0434\u0438\u043C\u044B\u0439, \u043D\u0430\u0436\u0430\u0432 \u043D\u0430 \u0441\u043E\u043E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0443\u044E\u0449\u0443\u044E \u043A\u043D\u043E\u043F\u043A\u0443" /* samples.tariffStep1 */, {
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
                            })];
                    case 1:
                        message_id = (_a.sent()).message_id;
                        ctx.session.message_id = message_id;
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, ctx.telegram.editMessageText(ctx.chat.id, ctx.session.message_id, 0, "\u0427\u0442\u043E\u0431\u044B \u043E\u0437\u043D\u0430\u043A\u043E\u043C\u0438\u0442\u044C\u0441\u044F \u0441 \u0442\u0430\u0440\u0438\u0444\u043E\u043C, \u0432\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043D\u0435\u043E\u0431\u0445\u043E\u0434\u0438\u043C\u044B\u0439, \u043D\u0430\u0436\u0430\u0432 \u043D\u0430 \u0441\u043E\u043E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0443\u044E\u0449\u0443\u044E \u043A\u043D\u043E\u043F\u043A\u0443" /* samples.tariffStep1 */, {
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
                        })];
                    case 3:
                        message_id = (_a.sent()).message_id;
                        ctx.session.message_id = message_id;
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        }); });
        return stage;
    };
    SceneGenerator.prototype.subPayment = function () {
        var _this = this;
        var payment = new telegraf_1.Scenes.BaseScene('subpay');
        payment.enter(function (ctx) { return __awaiter(_this, void 0, void 0, function () {
            var text, message_id, message_id;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        text = '';
                        switch (ctx.session.thesub) {
                            case 1:
                                text = "\u0422\u0430\u0440\u0438\u0444: \uD83D\uDD10 1 \u043C\u0435\u0441\u044F\u0446 \u0437\u0430 1490\u20BD \uD83C\uDF9F\uFE0F\n\u0421\u0442\u043E\u0438\u043C\u043E\u0441\u0442\u044C: 10.00 \uD83C\uDDF7\uD83C\uDDFARUB\n\u0421\u0440\u043E\u043A \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u044F: 31 \u0434\u043D\u0435\u0439" /* samples.tariffStep2Point1 */;
                                break;
                            case 2:
                                text = "\u0422\u0430\u0440\u0438\u0444: \uD83D\uDD10 3 \u043C\u0435\u0441\u044F\u0446 \u0437\u0430 3990\u20BD \uD83C\uDF9F\uFE0F\n\u0421\u0442\u043E\u0438\u043C\u043E\u0441\u0442\u044C: 10.00 \uD83C\uDDF7\uD83C\uDDFARUB\n\u0421\u0440\u043E\u043A \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u044F: 31 \u0434\u043D\u0435\u0439" /* samples.tariffStep2Point2 */;
                                break;
                            case 3:
                                text = "\u0422\u0430\u0440\u0438\u0444: \uD83D\uDD10 12 \u043C\u0435\u0441\u044F\u0446td \u0437\u0430 14490\u20BD \uD83C\uDF9F\uFE0F\n\u0421\u0442\u043E\u0438\u043C\u043E\u0441\u0442\u044C: 10.00 \uD83C\uDDF7\uD83C\uDDFARUB\n\u0421\u0440\u043E\u043A \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u044F: 31 \u0434\u043D\u0435\u0439" /* samples.tariffStep2Point3 */;
                                break;
                        }
                        if (!!ctx.session.message_id) return [3 /*break*/, 2];
                        return [4 /*yield*/, ctx.replyWithHTML(text, {
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
                            })];
                    case 1:
                        message_id = (_a.sent()).message_id;
                        ctx.session.message_id = message_id;
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, ctx.telegram.editMessageText(ctx.chat.id, ctx.session.message_id, 0, text, {
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
                        })];
                    case 3:
                        message_id = (_a.sent()).message_id;
                        ctx.session.message_id = message_id;
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        }); });
        return payment;
    };
    SceneGenerator.prototype.paymentInfo = function () {
        var _this = this;
        var info = new telegraf_1.Scenes.BaseScene('payinfo');
        info.enter(function (ctx) { return __awaiter(_this, void 0, void 0, function () {
            var text, message_id;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        text = "\u0421\u043F\u043E\u0441\u043E\u0431 \u043E\u043F\u043B\u0430\u0442\u044B: \u0422\u0438\u043D\u044C\u043A\u043E\u0444\u0444/\u0421\u0431\u0435\u0440/\u0410\u043B\u044C\u0444\u0430\n\u041A \u043E\u043F\u043B\u0430\u0442\u0435: 10.00 \uD83C\uDDF7\uD83C\uDDFARUB\n\u0412\u0430\u0448 ID: ${ctx.chat.id}\n\u0420\u0435\u043A\u0432\u0438\u0437\u0438\u0442\u044B \u0434\u043B\u044F \u043E\u043F\u043B\u0430\u0442\u044B:\n\n\u041F\u0435\u0440\u0435\u0432\u043E\u0434 \u0441\u043E\u0433\u043B\u0430\u0441\u043D\u043E \u0442\u0430\u0440\u0438\u0444\u0443 \u043A\u043E\u0442\u043E\u0440\u044B\u0439 \u0432\u044B\u0431\u0440\u0430\u043B\u0438:\n\uD83D\uDC9A1 \u043C\u0435\u0441\u044F\u0446 - 1.490\n\uD83D\uDC9A3 \u043C\u0435\u0441\u044F\u0446\u0430 - 3.990\n\uD83D\uDC9A1 \u0433\u043E\u0434 - 14.990\n----------------------------------\n\u041D\u043E\u043C\u0435\u0440 \u043A\u0430\u0440\u0442\u044B \u0434\u043B\u044F \u043F\u0435\u0440\u0435\u0432\u043E\u0434\u0430:\n\uD83D\uDCB34890494776467862(\uD83E\uDD5DQIWI) \u2705\n----------------------------------\n\u041F\u0415\u0420\u0415\u0412\u041E\u0414 \u041D\u0410 \u0421\u0411\u0415\u0420 \u0438 \u0422\u0418\u041D\u042C\u041A\u041E\u0424\u0424 \u0414\u041E\u0421\u0422\u0423\u041F\u0415\u041D \u0422\u041E\u041B\u042C\u041A\u041E \u0414\u041B\u042F \u0421\u0422\u0410\u0420\u042B\u0425 \u041F\u041E\u041B\u042C\u0417\u041E\u0412\u0410\u0422\u0415\u041B\u0415\u0419\n(\u2757\u041A\u0422\u041E \u0420\u0410\u041D\u0415\u0415  \u0411\u0420\u0410\u041B \u041F\u041E\u0414\u041F\u0418\u0421\u041A\u0423\u2757)\n----------------------------------\n\u26A0\uFE0F\u0412\u0441\u0435 \u043F\u0435\u0440\u0435\u0432\u043E\u0434\u044B \u043F\u0440\u043E\u0432\u0435\u0440\u044F\u044E\u0442\u0441\u044F \u0432 \u0440\u0443\u0447\u043D\u0443\u044E \u0430\u0434\u043C\u0438\u043D\u043E\u043C \u26A0\uFE0F\n\uD83D\uDD10\u041E\u043F\u043B\u0430\u0442\u0438\u0432 \u043D\u0435 \u0437\u0430\u0431\u0443\u0434\u044C\u0442\u0435 \u043F\u0440\u0438\u043A\u0440\u0435\u043F\u0438\u0442\u044C \u0447\u0435\u043A \u0431\u043E\u0442\u0443. \n\u041F\u043E \u0432\u0441\u0435\u043C \u0432\u043E\u043F\u0440\u043E\u0441\u0430\u043C:\n\n\u260E\uFE0F @KO_PRIORITYHELPER_BOT\n__________________________\n" /* samples.traiffStep3 */;
                        return [4 /*yield*/, ctx.telegram.editMessageText(ctx.chat.id, ctx.session.message_id, 0, text, {
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
                            })];
                    case 1:
                        message_id = (_a.sent()).message_id;
                        ctx.session.message_id = message_id;
                        return [2 /*return*/];
                }
            });
        }); });
        return info;
    };
    SceneGenerator.prototype.AccessPayment = function () {
        var _this = this;
        var access = new telegraf_1.Scenes.BaseScene('accesspayment');
        var text;
        access.enter(function (ctx) { return __awaiter(_this, void 0, void 0, function () {
            var text, message_id;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        text = "\uD83D\uDC81\uD83C\uDFFB\u200D\u2642\uFE0F <b>\u041E\u043F\u043B\u0430\u0442\u0438\u043B\u0438?</b>\n\n\uD83D\uDC4C\uD83C\uDFFB \u0422\u043E\u0433\u0434\u0430 \u043E\u0442\u043F\u0440\u0430\u0432\u044C\u0442\u0435 \u0441\u044E\u0434\u0430 \u043A\u0430\u0440\u0442\u0438\u043D\u043A\u043E\u0439 (\u043D\u0435 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u043E\u043C!) \u043A\u0432\u0438\u0442\u0430\u043D\u0446\u0438\u044E \u043F\u043B\u0430\u0442\u0435\u0436\u0430: \u0441\u043A\u0440\u0438\u043D\u0448\u043E\u0442 \u0438\u043B\u0438 \u0444\u043E\u0442\u043E.\n\n\u041D\u0430 \u043A\u0432\u0438\u0442\u0430\u043D\u0446\u0438\u0438 \u0434\u043E\u043B\u0436\u043D\u044B \u0431\u044B\u0442\u044C \u0447\u0435\u0442\u043A\u043E \u0432\u0438\u0434\u043D\u044B: \u0434\u0430\u0442\u0430, \u0432\u0440\u0435\u043C\u044F \u0438 \u0441\u0443\u043C\u043C\u0430 \u043F\u043B\u0430\u0442\u0435\u0436\u0430.\n__________________________\n<b>\u0417\u0430 \u0441\u043F\u0430\u043C \u0432\u044B \u043C\u043E\u0436\u0435\u0442\u0435 \u0431\u044B\u0442\u044C \u0437\u0430\u0431\u043B\u043E\u043A\u0438\u0440\u043E\u0432\u0430\u043D\u044B!</b>" /* samples.tariffStep4 */;
                        return [4 /*yield*/, ctx.telegram.editMessageText(ctx.chat.id, ctx.session.message_id, 0, text, {
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
                            })];
                    case 1:
                        message_id = (_a.sent()).message_id;
                        ctx.session.message_id = message_id;
                        return [2 /*return*/];
                }
            });
        }); });
        access.on('photo', function (ctx) { return __awaiter(_this, void 0, void 0, function () {
            var text, message_id;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, ctx.telegram.sendPhoto(1177303799, ctx.message.photo[ctx.message.photo.length - 1].file_id, { caption: "".concat(ctx.chat.id, "\n").concat(ctx.session.durationsub, " ") })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, ctx.telegram.deleteMessage(ctx.chat.id, ctx.session.message_id)];
                    case 2:
                        _a.sent();
                        text = "\u2705 \u041A\u0432\u0438\u0442\u0430\u043D\u0446\u0438\u044F \u043E\u0442\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0430 \u043E\u043F\u0435\u0440\u0430\u0442\u043E\u0440\u0443!\n\n\u041A\u0430\u043A \u0442\u043E\u043B\u044C\u043A\u043E \u043C\u044B \u043F\u0440\u043E\u0432\u0435\u0440\u0438\u043C \u043F\u043B\u0430\u0442\u0451\u0436 - \u0443 \u0412\u0430\u0441 \u0430\u043A\u0442\u0438\u0432\u0438\u0440\u0443\u0435\u0442\u0441\u044F \u043F\u043E\u0434\u043F\u0438\u0441\u043A\u0430! \u041E\u0436\u0438\u0434\u0430\u0439\u0442\u0435 ;)" /* samples.tariffStep5 */;
                        return [4 /*yield*/, ctx.telegram.deleteMessage(ctx.chat.id, ctx.message.message_id)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, ctx.replyWithHTML(text, {
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
                            })];
                    case 4:
                        message_id = (_a.sent()).message_id;
                        ctx.session.message_id = message_id;
                        return [2 /*return*/];
                }
            });
        }); });
        return access;
    };
    SceneGenerator.prototype.subStatus = function () {
        var _this = this;
        var sub = new telegraf_1.Scenes.BaseScene('substatus');
        var status = [0];
        sub.enter(function (ctx) { return __awaiter(_this, void 0, void 0, function () {
            var text, user, message_id, message_id;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        text = '';
                        return [4 /*yield*/, user_entity_js_1.User.query().findById(ctx.chat.id).returning('status')];
                    case 1:
                        user = _a.sent();
                        if (!!ctx.session.message_id) return [3 /*break*/, 3];
                        return [4 /*yield*/, ctx.replyWithHTML(text, {
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
                            })];
                    case 2:
                        message_id = (_a.sent()).message_id;
                        ctx.session.message_id = message_id;
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, ctx.telegram.editMessageText(ctx.chat.id, ctx.session.message_id, 0, text, {
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
                        })];
                    case 4:
                        message_id = (_a.sent()).message_id;
                        ctx.session.message_id = message_id;
                        _a.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        }); });
        return sub;
    };
    SceneGenerator.prototype.remoteQuestions = function () {
        var _this = this;
        var q = new telegraf_1.Scenes.BaseScene('questions');
        q.enter(function (ctx) { return __awaiter(_this, void 0, void 0, function () {
            var text, message_id, message_id;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        text = "\u2699\uFE0F\u041F\u043E \u0432\u0441\u0435\u043C \u0432\u043E\u043F\u0440\u043E\u0441\u0430\u043C:\n@KO_PriorityHelper_Bot" /* samples.questions */;
                        if (!!ctx.session.message_id) return [3 /*break*/, 2];
                        return [4 /*yield*/, ctx.replyWithHTML(text, {
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
                            })];
                    case 1:
                        message_id = (_a.sent()).message_id;
                        ctx.session.message_id = message_id;
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, ctx.telegram.editMessageText(ctx.chat.id, ctx.session.message_id, 0, text, {
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
                        })];
                    case 3:
                        message_id = (_a.sent()).message_id;
                        ctx.session.message_id = message_id;
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        }); });
        return q;
    };
    SceneGenerator.prototype.infoAbout = function () {
        var _this = this;
        var info = new telegraf_1.Scenes.BaseScene('info');
        info.enter(function (ctx) { return __awaiter(_this, void 0, void 0, function () {
            var text, message_id, message_id;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        text = "\uD83D\uDFE2 \u0421 \u043F\u043E\u043C\u043E\u0449\u044C\u044E \u0441\u0435\u0440\u0432\u0438\u0441\u0430 \u0412\u0430\u043C \u043F\u043E\u043B\u043D\u043E\u0446\u0435\u043D\u043D\u043E (\u0431\u043B\u0430\u0433\u043E\u0434\u0430\u0440\u044F \u0430\u0432\u0442\u043E\u043F\u0435\u0440\u0435\u0441\u044B\u043B\u043A\u0435, \u0431\u0435\u0437 \u0437\u0430\u0434\u0435\u0440\u0436\u043A\u0438) \u0431\u0443\u0434\u0443\u0442 \u0434\u043E\u0441\u0442\u0443\u043F\u043D\u044B \u0438\u0434\u0435\u0438 \u0438 \u0441\u0438\u0433\u043D\u0430\u043B\u044B \u0441\u0440\u0430\u0437\u0443 \u0438\u0437 20+ \u043A\u0430\u043D\u0430\u043B\u043E\u0432\n\n\u2139\uFE0F\u041F\u043E\u043B\u043D\u044B\u0439 \u0441\u043F\u0438\u0441\u043E\u043A \u043A\u0430\u043D\u0430\u043B\u043E\u0432 \u0432\u044B \u043C\u043E\u0436\u0435\u0442\u0435 \u0443\u0437\u043D\u0430\u0442\u044C \u0442\u0443\u0442: https://teletype.in/@ko_priority/list\n\n\u00A9\uFE0F\u041C\u044B \u043F\u043E\u0441\u0442\u043E\u044F\u043D\u043D\u043E \u0438\u0449\u0435\u043C \u043D\u043E\u0432\u044B\u0435 \u043A\u0430\u043D\u0430\u043B\u044B \u0438 \u043E\u0441\u0442\u0430\u0432\u043B\u044F\u0435\u043C \u0443 \u0441\u0435\u0431\u044F \u0432 \u043F\u043E\u0434\u0431\u043E\u0440\u043A\u0435 \u043B\u0443\u0447\u0448\u0438\u0445 \u0438\u0437 \u043B\u0443\u0447\u0448\u0438\u0445, \u0443\u0434\u0430\u043B\u044F\u044F \u0442\u0435\u0445, \u043A\u0442\u043E \u043D\u0435 \u044D\u0444\u0444\u0435\u043A\u0442\u0438\u0432\u0435\u043D" /* samples.info */;
                        if (!!ctx.session.message_id) return [3 /*break*/, 2];
                        return [4 /*yield*/, ctx.replyWithHTML(text, {
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
                            })];
                    case 1:
                        message_id = (_a.sent()).message_id;
                        ctx.session.message_id = message_id;
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, ctx.telegram.editMessageText(ctx.chat.id, ctx.session.message_id, 0, text, {
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
                        })];
                    case 3:
                        message_id = (_a.sent()).message_id;
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        }); });
        return info;
    };
    SceneGenerator.prototype.AcceptTheSub = function () {
        var _this = this;
        var acc = new telegraf_1.Scenes.BaseScene('acception');
        acc.enter(function (ctx) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, ctx.replyWithHTML('<b>Введите id пользователя</b>')];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        acc.on('text', function (ctx) { return __awaiter(_this, void 0, void 0, function () {
            var _a, date;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 5]);
                        return [4 /*yield*/, user_entity_js_1.User.query().findById(ctx.message.text).patch({
                                status: true
                            })];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, ctx.telegram.sendMessage(ctx.message.text, '✅Ваша заявка была одобрена', {
                                disable_web_page_preview: true,
                                parse_mode: 'HTML'
                            })];
                    case 2:
                        _b.sent();
                        return [3 /*break*/, 5];
                    case 3:
                        _a = _b.sent();
                        return [4 /*yield*/, ctx.replyWithHTML('<b>Неверный id</b>')];
                    case 4:
                        _b.sent();
                        return [3 /*break*/, 5];
                    case 5:
                        date = new Date();
                        return [4 /*yield*/, user_entity_js_1.User.query().findById(ctx.message.text).patch({
                                date: String(date.getFullYear()) + '-' + '0' + String(date.getMonth() + 1) + '-' + String(date.getDate()),
                                duration: ctx.session.durationsub
                            })];
                    case 6:
                        _b.sent();
                        return [4 /*yield*/, ctx.scene.leave()];
                    case 7:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        return acc;
    };
    SceneGenerator.prototype.ReSendAction = function () {
        var _this = this;
        var messages = new telegraf_1.Scenes.BaseScene('q1f8y');
        messages.enter(function (ctx) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, ctx.replyWithHTML('Отправьте сообщение для пересылки')];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        messages.on('text', function (ctx) { return __awaiter(_this, void 0, void 0, function () {
            var userData, item, dat, theDateOfTheStart;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ctx.session.messageId = ctx.message.message_id;
                        return [4 /*yield*/, user_entity_js_1.User.query().returning('*')];
                    case 1:
                        userData = _a.sent();
                        for (item in userData) {
                            dat = new Date();
                            theDateOfTheStart = new Date(userData[item].date);
                            dat = new Date(String(dat.getFullYear()) + '-' + '0' + String(dat.getMonth() + 1) + '-' + String(dat.getDate()));
                            if (+theDateOfTheStart - +dat > 24 * 60 * 60 * 1000 * userData[item].duration * 10) {
                                ctx.telegram.sendMessage(userData[item].id, 'Ваша подписка истекла.');
                            }
                            else {
                                ctx.telegram.copyMessage(userData[item].id, ctx.chat.id, ctx.session.messageId);
                            }
                        }
                        return [4 /*yield*/, ctx.scene.leave()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        messages.on('photo', function (ctx) { return __awaiter(_this, void 0, void 0, function () {
            var userData, item, dat, theDateOfTheStart;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ctx.session.messageId = ctx.message.message_id;
                        return [4 /*yield*/, user_entity_js_1.User.query().returning('*')];
                    case 1:
                        userData = _a.sent();
                        for (item in userData) {
                            dat = new Date();
                            theDateOfTheStart = new Date(userData[item].date);
                            dat = new Date(String(dat.getFullYear()) + '-' + '0' + String(dat.getMonth() + 1) + '-' + String(dat.getDate()));
                            if (+theDateOfTheStart - +dat > 24 * 60 * 60 * 1000 * userData[item].duration * 10) {
                                ctx.telegram.sendMessage(userData[item].id, 'Ваша подписка истекла.');
                            }
                            else {
                                ctx.telegram.copyMessage(userData[item].id, ctx.chat.id, ctx.session.messageId);
                            }
                        }
                        return [4 /*yield*/, ctx.scene.leave()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        return messages;
    };
    return SceneGenerator;
}());
exports.SceneGenerator = SceneGenerator;
