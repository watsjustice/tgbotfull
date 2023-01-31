"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const objection_1 = require("objection");
const knexCo = {
    development: Object.assign({ client: 'pg', connection: 'postgres://postgres:root@localhost:5432/tgbotpractice', migrations: {
            directory: './db/migrations',
        }, seeds: {
            directory: './db/seeds',
        } }, (0, objection_1.knexSnakeCaseMappers)())
};
exports.default = knexCo;
//# sourceMappingURL=knexfile.js.map