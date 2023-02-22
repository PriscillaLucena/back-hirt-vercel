import express, { Express, Request, Response } from "express"
import cors from "cors"
import dotenv from "dotenv"
// import { Knex } from "knex"
// import knex from "knex"
// import { compare } from "bcryptjs"
import { UserRouter } from "./Routes/UserRouter"
import { ConstructionsRouter } from "./Routes/ConstructionsRouter"
import { AddressInfo } from "net";
import { apartmentsRouter } from "./Routes/ApartmentsRouter"


/**************************** CONFIG ******************************/

dotenv.config()

const app: Express = express()
app.use(express.json())
app.use(cors())

app.use("/user", UserRouter);
app.use("/construction", ConstructionsRouter)
app.use("/apartments", apartmentsRouter)

const server = app.listen(3003, () => {
    if (server) {
      const address = server.address() as AddressInfo;
      console.log(`Servidor rodando em http://localhost:${address.port}`);
    } else {
      console.error(`Falha ao rodar o servidor.`);
    }
  });

