import * as pg from 'pg';
import {knexSnakeCaseMappers} from "objection";



export default {
  development: {
    client: 'pg',
    connection: 'postgres://postgres:root@localhost:5432/tgbotpractice',
    migrations: {
      directory: './db/migrations',
    },
    seeds: {
      directory: './db/seeds',
    },
    ...knexSnakeCaseMappers(),
  }
};