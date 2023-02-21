import ApartmentsDB from "../Data/ApartmentsDB"
import { CustomError } from "../Error/CustomError"
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

    GetApartmentsById=async(input: inputApDTO): Promise<any>=>{
        try {
            if (!input.token) {
                throw new CustomError(400, "'token' must be provided");
            }

            const tokenData: authenticationData = this.authenticator.getTokenData(input.token)

            console.log("token", tokenData)

            if (tokenData.role !== "collab") {
                throw new CustomError(400, "'token' must be provided");
            }

            const queryResult: any = await this.apartmentsDB.GetApartmentsById(input)

            console.log(queryResult)

            return queryResult 
        } catch (error) {
            
        }
    }
}