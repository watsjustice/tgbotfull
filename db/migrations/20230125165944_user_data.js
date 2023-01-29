import {User} from "../../entities/user_entity.js";


export async function up(knex) {
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
  })

  return knex;
}

export async function down(knex) {
  return knex.schema.dropTable(User.tableName);
}
