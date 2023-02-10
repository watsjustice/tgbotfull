import { User } from "../../entities/user_entity"
import { Knex } from "knex";
import { Order } from "../../entities/order_entity";
import { Subscription } from "../../entities/subscription_entity";

export async function up(knex: Knex) {
  return knex.schema.createTable(User.tableName, table => {
    table
        .string('id')
        .primary()
        .unique()
    table
        .string('SubMode')
        .defaultTo('inactive')
    table
        .string('attended')
        .notNullable()

  })
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(User.tableName);
}