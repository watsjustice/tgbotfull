import {Model} from "objection";

export class User extends Model {

    static get tableName() {
        return 'userdata'
    }
    
    id!: string;
    status!: boolean;
    date!: string;
    duration!: number;


}