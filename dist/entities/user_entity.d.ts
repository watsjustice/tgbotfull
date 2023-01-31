import { Model } from "objection";
export declare class User extends Model {
    static get tableName(): string;
    id: string;
    status: boolean;
    date: string;
    duration: number;
}
