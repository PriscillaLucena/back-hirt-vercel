/**************************** IMPORTS ******************************/

import express, { Express, Request, Response } from "express"
import cors from "cors"
import dotenv from "dotenv"
import { Knex } from "knex"
import knex from "knex"
import { generateToken } from "./services/Authenticator"
import { compare } from "bcryptjs"


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
// app.use(express.static('../public/upload/users'));
app.use(express.json())
app.use(cors())

// const multer = require('multer');
// let upload = multer({ dest: 'pasta_de_rececao/' });

// //upload com um POST

// app.post('caminho_dentro_da_pasta_estatica', upload.single('imagem'),
//     (req, res) => res.send('Sucesso'));

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {

//         cb(null, 'pasta_de_rececao/');
//     },
//     filename: function (req, file, cb) {

//         cb(null, `${file.fieldname} + '-' +${path.extname(file.originalname)}`)
//     }
// });

// var imgur = require('imgur');
// imgur.setAPIUrl('https://api.imgur.com/');

// imgur.uploadFile('/caminho/da/imagem.png')
//     .then(function (json) {
//         console.log(json.data.link);
//     })
//     .catch(function (err) {
//         console.error(err.message);
//     });

// upload = multer({
//     storage: storage
// });
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

app.put("/apartamentos/:id", async (req: Request, res: Response) => {
    let errorCode = 400
    let multer = require('multer');

    var foto = null;
    try {

        var path = require('path');
        var storage = multer.diskStorage({
            destination: function (req: any, file: any, cb: (arg0: null, arg1: string | undefined) => void) {
                cb(null, process.env.DIRETORIOUPLOAD);
            },
            filename: function (req: any, file: { originalname: string }, cb: (arg0: null, arg1: any) => void) {
                let fileExtension = file.originalname.split('.')[1];
                cb(null, require('crypto')
                    .randomBytes(64).toString('hex') + path.extname(file.originalname));
            }
        });

        foto = multer({ storage: storage }).fields([
            { name: 'anexo', maxCount: 1 }
        ]);

        const id = req.params.id
        const { limpeza_completa } = req.body

        const timeElapsed = Date.now();
        const today = new Date(timeElapsed);
        console.log(today)
        let options: {
            year: any, month: any, day: any
        } = { year: 'numeric', month: '2-digit', day: 'numeric' }

        let data1 = today.toLocaleString('ko', options)
        let data2 = data1.replace(/. /g, '/')
        let data3 = data2.replace('.', '')

        await connection.raw(`
        UPDATE apartamentos 
        SET limpeza_completa = "${limpeza_completa}",
            data = "${data3}",
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

        console.log(result[0].tipo_acesso.toUpperCase())
        const token: string = generateToken({
            id: result[0].id,
            role: result[0].tipo_acesso.toUpperCase()
        })

        console.log(token)

        res.send({
            message: "Usuário logado!",
            token
        })
        // }
    } catch (error: any) {
        res.status(errorCode).send(error.message)
    }
})

app.listen(3003, () => {
    console.log("Server running on port 3003")
});
