import { Subscription } from "../../entities/subscription_entity"
import { Knex } from "knex";
import { User } from "../../entities/user_entity";
import { Order } from "../../entities/order_entity";

export async function up(knex: Knex) {
  return knex.schema.createTable(Subscription.tableName, table => {
    table
        .increments('id')
        .primary()
    table
        .string('isPaid')
        .notNullable()
        .defaultTo('error')
    table
        .string('start_date')
        .notNullable()
        .defaultTo('error')
    table
        .string('end_date')
        .notNullable()
        .defaultTo('error')
    table
        .integer('type')
    table 
        .integer('price')
        .notNullable()
    
    table
        .string('user_id')
        .references('id')
        .inTable(User.tableName)

  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(Subscription.tableName);
}