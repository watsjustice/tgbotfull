"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const knex_1 = require("knex");
const knexfile_1 = require("../db/knexfile");
const objection_1 = require("objection");
objection_1.Model.knex((0, knex_1.default)(knexfile_1.default));
class User extends objection_1.Model {
    static get tableName() {
        return 'userdata';
    }
}
exports.User = User;
//# sourceMappingURL=user_entity.js.map