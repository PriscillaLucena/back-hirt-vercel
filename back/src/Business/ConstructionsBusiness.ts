import { CustomError } from "../error/CustomError";
import { authenticatorToken } from "../model/authenticToken";
import { authenticationData } from "../model/user";
import Authenticator from "../services/Authenticator";
import ConstructionsDB from "../Data/ConstructionsDB"
import Construction from "../model/constructions";

export type apartmentsDTO = {
    token: string|undefined,
    id: string
}

export default class ConstructionsBusiness{
    constructor(
        private authenticator: Authenticator,
        private constructionsDB: ConstructionsDB
    ){}


    GetApartments = async(input: apartmentsDTO)=>{

        // console.log("iniciei o business", input)

        if(!input.token){
            throw new CustomError(400, "'token' must be provided");
        }

        const tokenData: authenticationData = this.authenticator.getTokenData(input.token)

        // console.log("token", tokenData)

        if(tokenData.role !== "ADMIN"){
            throw new CustomError(400, "'token' must be provided");
        }

        const queryResult: any = await this.constructionsDB.GetConstructionsById(input.id)

        // console.log("queryResult", queryResult)

    }

}