import Knex from "knex";
import config from "../db/knexfile";
import {Model} from "objection";
import { Subscription } from "./subscription_entity";
import { Order } from "./order_entity";

Model.knex(Knex(config));
export class User extends Model {

    static get tableName() {
        return 'user'
    }

    static relationMappings() {
        return {
            orders : {
                relation : Model.HasManyRelation,
                modelClass: Order,
                join : {
                    from: "user.id",
                    to: "order.userId",
                }
            },
            subscription : {
               relation: Model.BelongsToOneRelation,
               modelClass: Subscription,
               join : {
                   from:"user.id",
                   to: "subscription.userId",

               }
            },
        }
    }

    id: string;

    status: boolean;

    subMode: string;

    duration : number;

    date : string;

    attended : string;

    orders : Order[];

    subscription : Subscription;
    

}   