import Knex from "knex";
import config from "../db/knexfile";
import {Model} from "objection";

Model.knex(Knex(config));
export class User extends Model {

    static get tableName() {
        return 'userdata'
    }
    
    id: string;
    status: boolean;
    date: string;
    duration: number;
}   