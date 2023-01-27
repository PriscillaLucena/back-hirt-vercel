import express, { Express, Request, Response } from "express"
import cors from "cors"
import dotenv from "dotenv"
import { Knex } from "knex"
import knex from "knex"
import { compare } from "bcryptjs"
import { UserRouter } from "../../back/src/Routes/UserRoute"
import { AddressInfo } from "net";


/**************************** CONFIG ******************************/

dotenv.config()

const app: Express = express()
app.use(express.json())
app.use(cors())

app.use("/user", UserRouter);


const server = app.listen(3000, () => {
    if (server) {
      const address = server.address() as AddressInfo;
      console.log(`Servidor rodando em http://localhost:${address.port}`);
    } else {
      console.error(`Falha ao rodar o servidor.`);
    }
  });









