import { Model } from "objection";
import { Subscription } from "./subscription_entity";
import { Order } from "./order_entity";
export declare class User extends Model {
    static get tableName(): string;
    static relationMappings(): {
        orders: {
            relation: import("objection").RelationType;
            modelClass: typeof Order;
            join: {
                from: string;
                to: string;
            };
        };
        subscription: {
            relation: import("objection").RelationType;
            modelClass: typeof Subscription;
            join: {
                from: string;
                to: string;
            };
        };
    };
    id: string;
    status: boolean;
    subMode: string;
    duration: number;
    date: string;
    attended: string;
    orders: Order[];
    subscription: Subscription;
}
