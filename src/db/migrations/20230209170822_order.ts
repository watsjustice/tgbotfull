import { Order } from "../../entities/order_entity"
import { Knex } from "knex";
import { User } from "../../entities/user_entity";

export async function up(knex: Knex) {
  return knex.schema.createTable(Order.tableName, table => {
    table
        .increments('id')
        .primary()
    table
        .string('user_id')
    table
        .foreign('user_id')
        .references('id')
        .inTable(User.tableName)
    table
        .boolean('status')
    table
        .integer('duration')
    table
        .string('date')

  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(Order.tableName);
}