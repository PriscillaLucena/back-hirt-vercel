import { inputApDTO } from "../Business/ApartmentsBusiness";
import ApartmentsRepository from "../Business/ApartmentsRepository";
import BaseDatabase from "./BaseDatabase";

export default class ApartmentsDB extends BaseDatabase implements ApartmentsRepository{
    GetApartmentsById = async(input: inputApDTO, id: string): Promise<any> =>{
        try {
            const apartment = await ApartmentsDB.connection.raw(`SELECT * FROM apartamentos WHERE user_id = "${input.id}"`)

            const apartmentResult = apartment[0].filter((a: any)=>{return a.obra_id === id}).map((a: any)=>{return a})

            console.log(apartmentResult)

            return apartmentResult
        } catch (error) {
            
        }

    }

    GetConstrucById = async(input: inputApDTO): Promise<any> =>{
        try {
            const apartment = await ApartmentsDB.connection.raw(`SELECT nome_obra, obra_id FROM apartamentos WHERE user_id = "${input.id}"`)

            return apartment[0]
        } catch (error) {
            
        }

    }
}