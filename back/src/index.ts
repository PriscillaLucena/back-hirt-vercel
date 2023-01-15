/**************************** IMPORTS ******************************/

import express, { Express, Request, Response } from "express"
import cors from "cors"
import dotenv from "dotenv"
import { Knex } from "knex"
import knex from "knex"

import { generateToken } from "./services/Authenticator"
import { compare } from "bcryptjs"
import { CompletionInfoFlags } from "typescript"


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
        SELECT * FROM Novas_obras
        `)

        res.status(200).send(resultado[0])

    } catch (error: any) {
        res.status(errorCode).send(error.message)
    }
});

app.put("/apartamentos/:id", async (req: Request, res: Response) => {
    let errorCode = 400
    try {
        const id = req.params.id
        const { limpeza_completa, data, foto } = req.body

        const timeElapsed = Date.now();
        const today = new Date(timeElapsed);
        // console.log(today)
        let options: {
            year: any, month: any, day: any
        } = {year: 'numeric' , month: '2-digit', day: 'numeric'}

        let data1 = today.toLocaleString('ko', options)


        let data2 = data1.replace(/. /g,'/')
        let data3 = data2.replace('.','')

        
        console.log("data", data3)

           
        await connection.raw(`
        UPDATE apartamentos 
        SET limpeza_completa = "${limpeza_completa}",
        data = "${data}",
        foto = "${foto}"
        WHERE id = "${id}"
        `)

        res.status(200).send({ message: "Apartamento concluído!" })

    } catch (error: any) {
        res.status(errorCode).send(error.message)
    }
});

app.post("/login", async (req: Request, res: Response) => {
    let errorCode = 400
    const { email, password } = req.body

    try {
        const result = await connection("Login_Hirt_Admin").select("*").where({ email })
        // console.log("cheguei aqui")
        // console.log("senha", password)
        // console.log(result[0].senha)
        // const passwordIsCorrect: boolean = await compare(password, result[0].senha)
        // console.log(passwordIsCorrect)
        // console.log("cheguei aqui 2")
        // if(passwordIsCorrect == false){
        //     console.log("chegou no if")

        // console.log(result[0].tipo_acesso.toUpperCase())
        const userRole = result[0].tipo_acesso

        const token: string = generateToken({
            id: result[0].id,
            role: result[0].tipo_acesso.toUpperCase()
        })

        console.log(token)

        res.send({
            message: "Usuário logado!",
            token,
            userRole
        })
        // }
    } catch (error: any) {
        res.status(errorCode).send(error.message)
    }
})

app.listen(3003, () => {
    console.log("Server running on port 3003")
});
