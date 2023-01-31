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
var scenes_js_1 = require("./scenes.js");
var telegraf_1 = require("telegraf");
var bot = new telegraf_1.Telegraf('5695594281:AAHLeRNeAoLbp0zL3fIvsbVRxgB8Q3T1whg');
var curScene = new scenes_js_1.SceneGenerator();
var opt = curScene.reSendMess();
var ssstage = curScene.Stages();
var subpayment = curScene.subPayment();
var paymentinfo = curScene.paymentInfo();
var accesspayment = curScene.AccessPayment();
var subStatus = curScene.subStatus();
var infoAbout = curScene.infoAbout();
var remoteQuestions = curScene.remoteQuestions();
var AcceptTheSub = curScene.AcceptTheSub();
var resendAction = curScene.ReSendAction();
var stage = new telegraf_1.Scenes.Stage([opt, ssstage, subpayment, paymentinfo, accesspayment, subStatus, remoteQuestions, infoAbout, AcceptTheSub, resendAction]);
bot.use((0, telegraf_1.session)({}), stage.middleware());
bot.start(function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, ctx.replyWithHTML("KO PRIORITY \u0434\u0430\u0435\u0442 \u0434\u043E\u0441\u0442\u0443\u043F \u043A \u0430\u043D\u0430\u043B\u0438\u0442\u0438\u043A\u0435, \u0438\u0434\u0435\u044F\u043C \u0438 \u0441\u0438\u0433\u043D\u0430\u043B\u0430\u043C \u0438\u0437 \u043F\u0440\u0438\u0432\u0430\u0442\u043D\u044B\u0445  \u043A\u0430\u043D\u0430\u043B\u043E\u0432 \u0431\u0435\u0437 \u0437\u0430\u0434\u0435\u0440\u0436\u043A\u0438 \u0432\u043E \u0432\u0440\u0435\u043C\u0435\u043D\u0438. \u23F1\n\n\u0421\u0445\u0435\u043C\u0430 \u043F\u0440\u043E\u0441\u0442\u0430: \u0438\u0437 \u043A\u0430\u043D\u0430\u043B\u0430-\u0438\u0441\u0442\u043E\u0447\u043D\u0438\u043A\u0430 \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u044F \u043F\u0435\u0440\u0435\u0441\u044B\u043B\u0430\u044E\u0442\u0441\u044F \u0432 \u043A\u0430\u043D\u0430\u043B-\u043A\u043E\u043F\u0438\u044E. \u0418 \u0442\u0430\u043A\u0438\u0445 \u0437\u0435\u0440\u043A\u0430\u043B\u044C\u043D\u044B\u0445 \u043A\u0430\u043D\u0430\u043B\u043E\u0432 \u0443 \u043D\u0430\u0441 \u043F\u0430\u0440\u0430 \u0434\u0435\u0441\u044F\u0442\u043A\u043E\u0432.\n\n\u0421\u043F\u0438\u0441\u043E\u043A \u0430\u043A\u0442\u0443\u0430\u043B\u044C\u043D\u044B\u0445 \u043A\u0430\u043D\u0430\u043B\u043E\u0432 \u0432\u044B \u043C\u043E\u0436\u0435\u0442\u0435 \u043F\u043E\u0441\u043C\u043E\u0442\u0440\u0435\u0442\u044C \u0432 \u0441\u0430\u043C\u043E\u043C \u0431\u043E\u0442\u0435. \u041F\u043E\u0434\u043E\u0439\u0434\u0451\u0442 \u043A\u0430\u043A \u0434\u043E\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u0435 \u043A \u0441\u0432\u043E\u0438\u043C \u0438\u0434\u0435\u044F\u043C.", {
                    reply_markup: {
                        one_time_keyboard: true,
                        inline_keyboard: [
                            [{ text: 'Главное меню', callback_data: 'main menu' }],
                        ]
                    },
                    disable_web_page_preview: true
                })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
bot.action('main menu', function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, ctx.scene.enter('main menu')];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
bot.action('1monthsub', function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                ctx.session.thesub = 1;
                ctx.session.durationsub = 1;
                return [4 /*yield*/, ctx.scene.enter('subpay')];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
bot.action('3monthsub', function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                ctx.session.thesub = 2;
                ctx.session.durationsub = 3;
                return [4 /*yield*/, ctx.scene.enter('subpay')];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
bot.action('12monthsub', function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                ctx.session.thesub = 3;
                ctx.session.durationsub = 12;
                return [4 /*yield*/, ctx.scene.enter('subpay')];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
bot.action('stages', function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, ctx.scene.enter('stage')];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
bot.action('paymentinfo', function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, ctx.scene.enter('payinfo')];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
bot.action('accesspayment', function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, ctx.scene.enter('accesspayment')];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
bot.action('substatus', function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, ctx.scene.enter('substatus')];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
bot.action('questions', function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, ctx.scene.enter('questions')];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
bot.action('info', function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, ctx.scene.enter('info')];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
bot.action('subpay', function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, ctx.scene.enter('stage')];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
bot.command('acception', function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, ctx.scene.enter('acception')];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
bot.command('q1f8y', function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, ctx.scene.enter('q1f8y')];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
await bot.launch();
