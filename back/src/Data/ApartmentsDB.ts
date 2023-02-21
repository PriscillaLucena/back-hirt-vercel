import { inputApDTO } from "../Business/ApartmentsBusiness";
import ApartmentsRepository from "../Business/ApartmentsRepository";
import BaseDatabase from "./BaseDataBase";

export default class ApartmentsDB extends BaseDatabase implements ApartmentsRepository{
    GetApartmentsById = async(input: inputApDTO): Promise<any> =>{
        try {
            const apartment = await ApartmentsDB.connection.raw(`SELECT * FROM apartamentos WHERE id = "${input.id}"`)

            return apartment
        } catch (error) {
            
        }

    }
}