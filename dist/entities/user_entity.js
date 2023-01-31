"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const objection_1 = require("objection");
class User extends objection_1.Model {
    static get tableName() {
        return 'userdata';
    }
}
exports.User = User;
//# sourceMappingURL=user_entity.js.map