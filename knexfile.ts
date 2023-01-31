import {knexSnakeCaseMappers} from "objection";



const knexCo : any = {
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

export default knexCo;