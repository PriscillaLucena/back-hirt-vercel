import BaseDatabase from "./BaseDB"
import ConstructionsRepository from "../Business/ConstructionsRepository"
import Construction from "../model/constructions"

export default class ConstructionsDB extends BaseDatabase implements ConstructionsRepository{

    GetConstructionsById = async(id: string): Promise<Construction | undefined>=>{
        try {
            // console.log("iniciei o DB", id)

            let building = await ConstructionsDB.connection.raw(`SELECT * FROM Novas_obras WHERE id = "${id}"`)

            console.log("nome da obra", building[0][0])
        

            const result = await ConstructionsDB.connection.raw(`SELECT obra_id, 
            numero_ap, andar, limpeza_completa,
            data, foto, nome_obra, responsavel, 
            qty_andares, qty_ap_andar FROM apartamentos 
            JOIN Novas_obras ON apartamentos.obra_id = Novas_obras.id
            `)

            // console.log(result[0])

            const result2 = result[0].filter((a: any) => { return a.obra_id === id }).map((a: any) => a)

            let array = [...result2]

            // console.log(result2)

            const input = {
                obra_id: building[0][0].id, 
                nome_obra: building[0][0].nome_obra,
                qty_andares: building[0][0].qty_andares,
                qty_ap_andar: building[0][0].qty_ap_andar,
                responsavel: building[0][0].responsavel,
                apartamentos: array
            }

            console.log("INPUT",input)

            const newConstruction: Construction = Construction.toConstructionModel(input)

            return newConstruction
        } catch (error) {
            
        }
    }

}