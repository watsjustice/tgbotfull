"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var objection_1 = require("objection");
var knexCo = {
    development: __assign({ client: 'pg', connection: 'postgres://postgres:root@localhost:5432/tgbotpractice', migrations: {
            directory: './db/migrations'
        }, seeds: {
            directory: './db/seeds'
        } }, (0, objection_1.knexSnakeCaseMappers)())
};
exports["default"] = knexCo;
