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
    obra_id: string;
    nome_obra: string,
    qty_andares: number,
    qty_ap_andar: number,
    responsavel: string,
    apartamentos: {
        numero_ap: number,
        andar: number,
        limpeza_completa: boolean,
        data: number,
        foto: string,
    }
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

// app.get("/apartamentos", async (req: Request, res: Response) => {
//     let errorCode = 400
//     try {

//         const resultado = await connection.raw(`
//         SELECT * FROM apartamentos
//             `)

//         res.status(200).send(resultado[0])

//     } catch (error: any) {
//         res.status(errorCode).send(error.message)
//     }
// });

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

app.post("/apartamentos/:obra_id", async (req: Request, res: Response) => {
    let errorCode = 400

    try {

        const obra_id = req.params
        const { numero_ap, andar, limpeza_completa, foto } = req.body

        const id = idGenerator.generate();

        const timeElapsed = Date.now();
        const today = new Date(timeElapsed);
        let options: {
            year: any, month: any, day: any
        } = { year: 'numeric', month: '2-digit', day: 'numeric' }
        let data1 = today.toLocaleString('ko', options)
        let data2 = data1.replace(/. /g, '/')
        let data = data2.replace('.', '')

        await connection("apartamentos")
            .insert({ id, numero_ap, andar, limpeza_completa, data, foto, obra_id })

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

        const { nome_obra, qty_andares, qty_ap_andar, responsavel } = req.body
        const id = idGenerator.generate();
        const qty_total_ap = qty_andares * qty_ap_andar

        await connection('Novas_obras')
            .insert({
                id,
                nome_obra,
                qty_andares,
                qty_ap_andar,
                qty_total_ap,
                responsavel
            })

        res.status(200).send({ message: 'Nova obra criada!' })

    } catch (error: any) {
        res.status(errorCode).send(error.message)
    }
})

// ################################
// APAGAR ANTES DO PUSH

app.get("/info/:id", async (req: Request, res: Response) => {
    let errorCode = 400
    try {
        const id = req.params.id
        //no select colocar tudo o que quero
        const obras = await connection.raw(`
        SELECT obra_id, numero_ap, andar, limpeza_completa, data, foto, nome_obra, responsavel, qty_andares, qty_ap_andar FROM apartamentos 
        JOIN Novas_obras ON apartamentos.obra_id = Novas_obras.id
        WHERE Novas_obras.id = "${id}"
        `)
        // console.log("obra", obra[0].nome_obra[0])

        let resposta: any = {}

        const newObra: obra = obras[0].map((obra: any) => {
            return resposta = {
                obra_id: obra.obra_id,
                nome_obra: obra.nome_obra,
                qty_andares: obra.qty_andares,
                qty_ap_andar: obra.qty_ap_andar,
                responsavel: obra.responsavel,
                apartamentos: {
                    numero_ap: obra.numero_ap,
                    andar: obra.andar,
                    limpeza_completa: obra.limpeza_completa,
                    data: obra.data,
                    foto: obra.foto,
                }
            }
        });

        res.status(200).send(newObra)

    } catch (error: any) {
        res.status(errorCode).send(error.message)
    }

});

app.delete("/obra/delete/:id", async (req: Request, res: Response) => {
   let errorCode = 400
    try {

        const id = req.params.id

        await connection.raw(`
        DELETE FROM Novas_obras
        WHERE id = "${id}"
        `)

        res.status(200).send({ message: 'Obra deletada!' })

    } catch (error: any) {
        res.status(errorCode).send(error.message)
    }
});


app.listen(3003, () => {
    console.log("Server running on port 3003")
});



// ###
// https://stackoverflow.com/questions/61985832/how-to-load-image-and-convert-to-blob-in-react


