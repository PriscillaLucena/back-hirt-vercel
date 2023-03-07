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

            let set1: any = []

            // const result1 = apartment[0].forEach((item: any) => {
            //     var duplicated  = set1.findIndex((redItem: any) => {
            //         return item.nome_obra == redItem.nome_obra;
            //     }) > -1;
            
            //     if(!duplicated) {
            //         set1.push(item);
            //     }
            // });
            

            // [...set1.values()];

            


            // filter((item: any, index: any) => apartment.indexOf(item) === index).map((a: any)=>{return a})

            console.log("aps", apartment.forEach((item: any) => {
                let duplicated  = set1.findIndex((redItem: any) => {
                    return item.nome_obra == redItem.nome_obra;
                }) > -1;
            
                if(!duplicated) {
                    set1.push(item);
                }
            }))

            return apartment[0]
        } catch (error) {
            
        }

    }

    GetConstructions = async (): Promise<any> => {
        try {
            const result = await ApartmentsDB.connection.raw(`SELECT * FROM Novas_obras`)

            console.log("obras", result)

            return result[0]
        } catch (error) {

        }
    }
}