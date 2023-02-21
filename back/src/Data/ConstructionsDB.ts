import BaseDatabase from "./BaseDataBase"
import ConstructionsRepository from "../Business/ConstructionsRepository"
import Construction, { apartamento, ConstructionNew } from "../model/constructions"
import IdGenerator from "../services/GenerateId"
import { CustomError } from "../Error/CustomError"

export default class ConstructionsDB extends BaseDatabase implements ConstructionsRepository {

    GetConstructionsById = async (id: string): Promise<Construction | undefined> => {
        try {
            console.log("iniciei o DB", id)

            let building = await ConstructionsDB.connection.raw(`SELECT * FROM Novas_obras WHERE id = "${id}"`)


            const result = await ConstructionsDB.connection.raw(`
            SELECT 
            obra_id, apartamentos.id as ap_id,
            numero_ap, andar, limpeza_completa,
            data, foto, nome_obra, responsavel, 
            qty_andares, qty_ap_andar FROM apartamentos 
            JOIN Novas_obras ON apartamentos.obra_id = Novas_obras.id
            `)

            console.log(result[0])

            const result2 = result[0].filter((a: any) => { return a.obra_id === id }).map((a: any) => a)

            let array = [...result2]


            const input = {
                obra_id: building[0][0].id,
                nome_obra: building[0][0].nome_obra,
                qty_andares: building[0][0].qty_andares,
                qty_ap_andar: building[0][0].qty_ap_andar,
                responsavel: building[0][0].responsavel,
                apartamentos: array
            }

            console.log("INPUT", input)

            const newConstruction: Construction = Construction.toConstructionModel(input)

            return newConstruction
        } catch (error) {

        }
    }

    GetConstructions = async (): Promise<any> => {
        try {
            const result = await ConstructionsDB.connection.raw(`SELECT * FROM Novas_obras`)

            console.log("obras", result)

            return result[0]
        } catch (error) {

        }
    }

    InsertApartments = async (body: apartamento) => {
        try {
            console.log("iniciei o DB")
            console.log(body)

            await ConstructionsDB.connection("apartamentos")
                .insert( body )

            return ("success!")

        } catch (error) {

        }
    }

    InsertNewConstructions = async (input: ConstructionNew) => {
        let message: string = 'Nova obra criada!'
        try {
            await ConstructionsDB.connection('Novas_obras')
                .insert({
                    id: input.GetId(),
                    nome_obra: input.GetNome_obra(),
                    qty_andares: input.GetQty_andares(),
                    qty_ap_andar: input.GetQty_ap_andar(),
                    qty_total_ap: input.GetQty_Total_ap(),
                    responsavel: input.GetResponsavel()
                })

            return message
        } catch(error: any) {
            throw new CustomError(400, error.sqlMessage || error.message);
        }


    }

}