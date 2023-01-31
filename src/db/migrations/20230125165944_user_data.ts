import { User } from "../../entities/user_entity"
import { Knex } from "knex";



export async function up(knex: Knex) {
  return knex.schema.createTable(User.tableName, table => {
    table
        .string('id')
        .notNullable()
        .unique()
    table
        .boolean('status')
        .notNullable()

    table
        .string('date')

    table
        .integer('duration')
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(User.tableName);
}