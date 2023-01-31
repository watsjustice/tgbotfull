import { Knex } from "knex";
import { knexSnakeCaseMappers } from "objection";
import * as dotenv from 'dotenv';
dotenv.config();


const knexCo: Knex.Config = {
    client: 'pg',
    connection: process.env.POSTGRES_URL,
    migrations: {
      directory: './db/migrations',
    },
    seeds: {
      directory: './db/seeds',
    },
    ...knexSnakeCaseMappers(),
};

export default knexCo; 