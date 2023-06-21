import { Knex } from "knex";
import { knexSnakeCaseMappers } from "objection";
import * as dotenv from 'dotenv';
dotenv.config();


const knexConfig: Knex.Config = {
    client: 'pg',
    connection: 'postgres://root:Gerrard27!@localhost/requiem1',//process.env.POSTGRES_URL,
    migrations: {
      directory: './migrations',
      stub: './migration.stub',
    },
    seeds: {
      directory: './seeds',
    },
    ...knexSnakeCaseMappers(),
};

export default knexConfig;