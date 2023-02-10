import { CustomError } from "../error/CustomError";
import { authenticatorToken } from "../model/authenticToken";
import { authenticationData } from "../model/user";
import Authenticator from "../services/Authenticator";
import ConstructionsDB from "../Data/ConstructionsDB"
import Construction, { apartamento, ConstructionNew } from "../model/constructions";
import IdGenerator from "../services/GenerateId";

export type apartmentsDTO = {
    token: string | undefined,
    id: string
}


export default class ConstructionsBusiness {
    constructor(
        private authenticator: Authenticator,
        private constructionsDB: ConstructionsDB,
        private idGenerator: IdGenerator
    ) { }


    GetApartments = async (input: apartmentsDTO) => {
        try {

            if (!input.token) {
                throw new CustomError(400, "'token' must be provided");
            }

            const tokenData: authenticationData = this.authenticator.getTokenData(input.token)

            console.log("token", tokenData)

            if (tokenData.role !== "admin") {
                throw new CustomError(400, "'token' must be provided");
            }

            const queryResult: any = await this.constructionsDB.GetConstructionsById(input.id)

            return queryResult

        } catch (error: any) {
            let message = error.sqlMessage || error.message
            return message
        }

    }

    GetAllConstructions = async (input: authenticatorToken) => {
        try {

            if (!input.token) {
                throw new CustomError(400, "'token' must be provided");
            }

            const tokenData: authenticationData = this.authenticator.getTokenData(input.token)

            console.log("token", tokenData)

            if (tokenData.role !== "admin") {
                throw new CustomError(400, "You need to be an ADMIN to access this page");
            }

            const queryResult: any = await this.constructionsDB.GetConstructions()

            return queryResult

        } catch (error: any) {
            let message = error.sqlMessage || error.message
            return message
        }
    }

    InsertApartments = async (input: apartmentsDTO, ap: any) => {
        try {

            if (!input.token) {
                throw new CustomError(400, "'token' must be provided");
            }

            const tokenData: authenticationData = this.authenticator.getTokenData(input.token)

            if (!tokenData) {
                throw new CustomError(401, "Unauthorized")
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

            const body: apartamento = {
                id: id,
                numero_ap: ap.numero_ap,
                andar: ap.andar,
                limpeza_completa: ap.limpeza_completa,
                data: data,
                foto: ap.foto,
                obra_id: input.id
            }

            

            const queryResult: any = await this.constructionsDB.InsertApartments(body)

            return queryResult

        } catch (error: any) {
            let message = error.sqlMessage || error.message
            return message
        }
    }

    InsertNewConstructions = async (input: authenticatorToken, body: any) => {
        try {
            if (!input.token) {
                throw new CustomError(400, "'token' must be provided");
            }

            const tokenData: authenticationData = this.authenticator.getTokenData(input.token)

            if (!tokenData) {
                throw new CustomError(401, "Unauthorized")
            }

            const id = this.idGenerator.generate()
            const qty_total_ap = body.qty_andares * body.qty_ap_andar

            const obraInput: any = {
                id: id,
                nome_obra: body.nome_obra,
                qty_andares: body.qty_andares,
                qty_ap_andar: body.qty_ap_andar,
                qty_total_ap: qty_total_ap,
                responsavel: body.responsavel
            }

            const newConstruction: ConstructionNew = ConstructionNew.toConstructionNewModel(obraInput)

            const result = await this.constructionsDB.InsertNewConstructions(newConstruction)

            return result


        } catch (error) {

        }
    }

}