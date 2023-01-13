/**************************** IMPORTS ******************************/

import express, { Express, Request, Response } from "express"
import cors from "cors"
import dotenv from "dotenv"
import {Knex} from "knex"
import knex from "knex"

/**************************** CONFIG ******************************/

dotenv.config()

export const connection: Knex = knex({
   client: "mysql",
   connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_SCHEMA,
      port: 3306,
      multipleStatements: true
   }
})

const app: Express = express()
app.use(express.json())
app.use(cors())

/**************************** TYPES ******************************/

type obra = {
   id: string,
   qty_andares: number,
   qty_total_ap: number,
}

type apartamento = {
   id: string,
   numero_ap: number,
   andar: number,
   limpeza_completa: boolean,
   data: number,
   foto: string,
  
}

/**************************** ENDPOINTS ******************************/

app.get("/apartamentos", async (req: Request, res: Response) => {
    let errorCode = 400
    try {

        const resultado = await connection.raw(`
        SELECT * FROM apartamentos
        `)

        res.status(200).send(resultado[0])

    } catch (error: any) {
        res.status(errorCode).send(error.message)
    }
});

app.get("/obra", async (req: Request, res: Response) => {
    let errorCode = 400
    try {

        const resultado = await connection.raw(`
        SELECT * FROM nome_obra
        `)

        res.status(200).send(resultado[0])

    } catch (error: any) {
        res.status(errorCode).send(error.message)
    }
});

app.listen(3003, () => {
    console.log("Server running on port 3003")
 });
