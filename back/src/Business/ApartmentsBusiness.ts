import ApartmentsDB from "../Data/ApartmentsDB"
import { CustomError } from "../Error/CustomError"
import { ApartmentNew } from "../model/apartments"
import { authenticationData } from "../model/user"
import Authenticator from "../services/Authenticator"
import IdGenerator from "../services/GenerateId"
import ApartmentsRepository from "./ApartmentsRepository"

export type inputApDTO = {
    token: string|undefined,
    id: string
}

export default class ApartmentsBusiness {
    constructor(
        private authenticator: Authenticator,
        private apartmentsDB: ApartmentsDB,
        private idGenerator: IdGenerator
    ){}

    GetApartmentsById=async(input: inputApDTO, obra_id: string): Promise<any>=>{
        try {
            if (!input.token) {
                throw new CustomError(400, "'token' must be provided");
            }

            const tokenData: authenticationData = this.authenticator.getTokenData(input.token)

            console.log("token", tokenData)

            if (tokenData.role !== "collab") {
                throw new CustomError(400, "'token' must be provided");
            }

            const queryResult: any = await this.apartmentsDB.GetApartmentsById(input, obra_id)

            console.log(queryResult)

            return queryResult
        } catch (error) {
            
        }
    }

    GetConstrucById=async(input: inputApDTO): Promise<any>=>{
        try {
            if (!input.token) {
                throw new CustomError(400, "'token' must be provided");
            }

            const tokenData: authenticationData = this.authenticator.getTokenData(input.token)

            console.log("token", tokenData)

            if (tokenData.role !== "collab") {
                throw new CustomError(400, "'token' must be provided");
            }

            const queryResult: any = await this.apartmentsDB.GetConstrucById(input)

            console.log(queryResult)

            return queryResult 
        } catch (error) {
            
        }
    }

    NewApartment = async(ap: any, input: inputApDTO)=>{
        try {
            if(!input.token) {
                throw new CustomError(400, "'token' must be provided");
            }

            const tokenData: authenticationData = this.authenticator.getTokenData(input.token)

            console.log("token", tokenData)

            if (tokenData.role !== "collab") {
                throw new CustomError(400, "'token' must be provided");
            }

            if (!ap.numero_ap || !ap.andar || !ap.limpeza_completa || !ap.data || !ap.foto || !ap.obra_id || !ap.user_id){
                throw new CustomError(400, "body must be provided!")
            }


            const id = this.idGenerator.generate()

            const timeElapsed = Date.now();
            const today = new Date(timeElapsed);
            let options: {
                year: any, month: any, day: any
            } = { year: 'numeric', month: '2-digit', day: 'numeric' }
            let data1 = today.toLocaleString('ko', options)
            let data2 = data1.replace(/. /g, '/')
            let data = data2.replace('.', '')

            const body: any = {
                id: id,
                numero_ap: ap.numero_ap,
                andar: ap.andar,
                limpeza_completa: ap.limpeza_completa,
                data: data,
                foto: ap.foto,
                obra_id: input.id,
                user_id: input.id
            }

            const newAp = ApartmentNew.toApartmentNewModel(body)


            // const queryResult: any = await .InsertApartments(newAp)

            // return queryResult
        } catch (error) {
            
        }
    }
}