"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const knex_1 = require("knex");
const knexfile_1 = require("../db/knexfile");
const objection_1 = require("objection");
const subscription_entity_1 = require("./subscription_entity");
const order_entity_1 = require("./order_entity");
objection_1.Model.knex((0, knex_1.default)(knexfile_1.default));
class User extends objection_1.Model {
    static get tableName() {
        return 'user';
    }
    static relationMappings() {
        return {
            orders: {
                relation: objection_1.Model.HasManyRelation,
                modelClass: order_entity_1.Order,
                join: {
                    from: "user.id",
                    to: "order.userId",
                }
            },
            subscription: {
                relation: objection_1.Model.BelongsToOneRelation,
                modelClass: subscription_entity_1.Subscription,
                join: {
                    from: "user.id",
                    to: "subscription.userId",
                }
            },
        };
    }
}
exports.User = User;
//# sourceMappingURL=user_entity.js.map