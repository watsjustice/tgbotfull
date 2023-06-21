import Knex from "knex";
import config from "../db/knexfile";
import {Model} from "objection";
import { User } from "./user_entity";
import { Order } from "./order_entity";


Model.knex(Knex(config));
export class Subscription extends Model {

    static get tableName() {
        return 'subscription'
    }
    
    id: number;

    isPaid: boolean;

    startDate: string;

    endDate: string;

    type: number;

    price: number;

    user : User;

    userId : string;

    subscriptionType : Order;

    static relationMappings() {

        return {
            user: {
                relation : Model.BelongsToOneRelation,
                modelClass: User,
                join : {
                    from: "subscription.userId",
                    to: "user.id"
               }
            },

            subscriptionType : {
                relation : Model.BelongsToOneRelation,
                modelClass : Order,
                join : {
                    from : "subscription.type",
                    to: "order.duration"
                }

            }
        }
    }
}   