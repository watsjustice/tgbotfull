import { Order } from "../../entities/order_entity"
import { Knex } from "knex";
import { User } from "../../entities/user_entity";
import { LastOrder } from "../../entities/last_user_order_entity";

export async function up(knex: Knex) {
  return knex.schema.createTable(LastOrder.tableName, table => {
    table
        .integer('orderId')
        .unique()
    table
        .foreign('orderId')
        .references('id')
        .inTable(Order.tableName)
    table
      .string('user_id')
    table
        .boolean('status')
    table
        .integer('price')
    table
        .integer('id')
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(LastOrder.tableName);
}