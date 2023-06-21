import Knex from "knex";
import knexConfig from "../db/knexfile";
import {Model} from "objection";
import { Order } from "./order_entity";

Model.knex(Knex(knexConfig));
export class LastOrder extends Model {

    static get tableName() {
        return 'lastOrder'
    }

    static relationMappings() {

        return {
            order : {
                relation : Model.HasManyRelation,
                modelClass : Order,
                join : {
                    from : "order.id",
                    to: "lastOrder.orderId"
                }
            }
        }
    }

    orderId: number;

    userId : string;

    status: boolean;

    order : Order;

    price : number;
}