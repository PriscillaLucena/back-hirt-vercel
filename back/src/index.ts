/**************************** IMPORTS ******************************/

import express, { Express, Request, Response } from "express"
import cors from "cors"
import dotenv from "dotenv"
import { Knex } from "knex"
import knex from "knex"
import { generateToken } from "./services/Authenticator"
import { compare } from "bcryptjs"
import { IdGenerator } from "./services/GenerateId"


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
const idGenerator = new IdGenerator();
/**************************** TYPES ******************************/

type obra = {
    id: string,
    nome_obra: string,
    qty_andares: number,
    qty_ap_andar: number,
    qty_total_ap: number,
    responsavel: string
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
        SELECT * FROM Novas_obras`)

res.status(200).send(resultado[0])

    } catch (error: any) {
        res.status(errorCode).send(error.message)
    }
});

app.put("/apartamentos/:id", async (req: Request, res: Response) => {
    let errorCode = 400

    try {
        //  let multer = require('multer');

        // var upload = null;
        // let path = '';
        // let storage = {}
        // const photoTransform: any = {
        //     path: require('path'),
        //     storage: multer.diskStorage({
        //         destination: function (req: any, file: any, cb: (arg0: null, arg1: string | undefined) => void) {
        //             cb(null, process.env.DIRETORIOUPLOAD);
        //         },
        //         filename: function (req: any, file: { originalname: string }, cb: (arg0: null, arg1: any) => void) {
        //             let fileExtension = file.originalname.split('.')[1];
        //             cb(null, require('crypto')
        //                 .randomBytes(64).toString('hex') + '_' + file.originalname);
        //         }
        //     }),
        //     upload: multer({ storage: storage }).fields([
        //         { name: 'anexo', maxCount: 1 }
        //     ])
        // }
        // const foto = photoTransform.path
        // console.log("foto", foto)
        const id = req.params.id
        const { numero_ap, limpeza_completa, foto } = req.body
        const timeElapsed = Date.now();
        const today = new Date(timeElapsed);
        let options: {
            year: any, month: any, day: any
        } = { year: 'numeric', month: '2-digit', day: 'numeric' }

        let data1 = today.toLocaleString('ko', options)
        let data2 = data1.replace(/. /g, '/')
        let data3 = data2.replace('.', '')

        console.log(data3)
        await connection.raw(`
        UPDATE apartamentos 
        SET numero_ap = ${numero_ap}
            limpeza_completa = "${limpeza_completa}",
            data = STR_TO_DATE ("${data3}", '%d/%m/%y),
            foto = "${foto}",
        WHERE id = "${id}"
            `)

        res.status(200).send({ message: "Apartamento concluído!" })

    } catch (error: any) {
        res.status(errorCode).send(error.message)
    }
})


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
        const userRole = result[0].tipo_acesso.toUpperCase()

        const token: string = generateToken({
            id: result[0].id,
            role: result[0].tipo_acesso
        })

        console.log(userRole)

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


app.post("/nova-obra", async (req: Request, res: Response) => {
   let errorCode = 404

    try {

        const {nome_obra, qty_andares, qty_ap_andar, qty_total_ap, responsavel} = req.body
        const id = idGenerator.generate();

        await connection('Novas_obras')
        .insert({id,
            nome_obra,
            qty_andares,
            qty_ap_andar,
            qty_total_ap,
            responsavel})

        res.status(200).send({message: 'Nova obra criada!'})
        
    } catch (error: any) {
        res.status(errorCode).send(error.message)
    }
})

app.listen(3003, () => {
    console.log("Server running on port 3003")
});
