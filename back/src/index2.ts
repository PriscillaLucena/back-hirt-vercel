import express, { Express, Request, Response } from "express"
import cors from "cors"
import dotenv from "dotenv"
import { Knex } from "knex"
import knex from "knex"
import { compare } from "bcryptjs"
import { UserRouter } from "./Routes/UserRouter"
import { ConstructionsRouter } from "./Routes/ConstructionsRouter" 
import { AddressInfo } from "net";


/**************************** CONFIG ******************************/

dotenv.config()

const app: Express = express()
app.use(express.json())
app.use(cors())

<<<<<<< HEAD:back/src/index.ts
app.use("/user", UserRouter);
app.use("/construction", ConstructionsRouter)
=======
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
>>>>>>> 82de65110359bbfc6b68d625a10a3cade124cf08:back/src/indexPri.ts



<<<<<<< HEAD:back/src/index.ts
const server = app.listen(3000, () => {
    if (server) {
      const address = server.address() as AddressInfo;
      console.log(`Servidor rodando em http://localhost:${address.port}`);
    } else {
      console.error(`Falha ao rodar o servidor.`);
    }
  });
=======
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


app.delete("/apartamento/delete/:id", async (req: Request, res: Response) => {
    let errorCode = 400
     try {
 
         const id = req.params.id
 
         await connection.raw(`
         DELETE FROM apartamentos
         WHERE id = "${id}"
         `)
 
         res.status(200).send({ message: 'Apartamento deletado!' })
 
     } catch (error: any) {
         res.status(errorCode).send(error.message)
     }
 });

 

app.listen(3003, () => {
    console.log("Server running on port 3003")
});



// ###
// https://stackoverflow.com/questions/61985832/how-to-load-image-and-convert-to-blob-in-react


