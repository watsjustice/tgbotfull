import Knex from "knex";
import knexConfig from "../db/knexfile";
import {Model} from "objection";
import { User } from "./user_entity";
import { Subscription } from "./subscription_entity";

Model.knex(Knex(knexConfig));
export class Order extends Model {

    static get tableName() {
        return 'order'
    }

    static relationMappings() {

        return {
            user : {
                relation : Model.BelongsToOneRelation,
                modelClass: User,
                join : {
                    from: "order.userId",
                    to: "user.id",
                }
            },

            order : {
                relation : Model.BelongsToOneRelation,
                modelClass : Subscription,
                join : {
                    from : "order.duration",
                    to: "subscription.type"
                }
            }
        }
    }
    id: number;

    userId : string;

    status: boolean;

    duration: number;

    type: number

    date: string;

    user : User;

    order : Subscription;


}   