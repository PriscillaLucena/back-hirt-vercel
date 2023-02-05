import { Request, Response } from "express";
import ConstructionsBusiness, { apartmentsDTO } from "../Business/ConstructionsBusiness"
import { authenticatorToken } from "../model/authenticToken";
import { apartamento } from "../model/constructions";

export default class ConstructionController {


    constructor(
        private constructionsBusiness: ConstructionsBusiness
    ) { }

    GetApartments = async (req: Request, res: Response) => {

        const input: apartmentsDTO = {
            token: req.headers.authorization,
            id: req.params.id
        }

        try {

            const apartments = await this.constructionsBusiness.GetApartments(input)

            res.status(200).send({ apartments })
        } catch (error: any) {
            let message = error.sqlMessage || error.message
            res.statusCode = 400

            res.send({ message })
        }
    }

    GetAllConstructions = async (req: Request, res: Response) => {
        const input: authenticatorToken = {
            token: req.headers.authorization
        }

        try {
            const allConstructions = await this.constructionsBusiness.GetAllConstructions(input)

            res.status(200).send({ allConstructions })
        } catch (error) {

        }
    }

    InsertApartments = async(req: Request, res: Response) => {
        const input: apartmentsDTO = {
            token: req.headers.authorization,
            id: req.params.id
        }

        const { numero_ap, andar, limpeza_completa, foto } = req.body

        const ap: any = {
            numero_ap: numero_ap, andar: andar, limpeza_completa: limpeza_completa, foto: foto
        }

        try {

            
            const result = await this.constructionsBusiness.InsertApartments(input, ap)

            res.status(200).send({ result })


        } catch (error) {
            
        }
    }

}