import dotenv from "dotenv"
import knex, { Knex } from "knex"

dotenv.config()

export default abstract class BaseDatabase {
    protected static connection: Knex = knex({
        client: "mysql",
        connection: {
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_SCHEMA,
            port: 3006,
            multipleStatements: true
        }
    })
}

console.log(process.env.PORT)