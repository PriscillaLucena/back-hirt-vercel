import { Request, Response } from "express";
import ConstructionsBusiness, { apartmentsDTO } from "../Business/ConstructionsBusiness"
import { authenticatorToken } from "../model/authenticToken";
import Construction, { apartamento } from "../model/constructions";

export default class ConstructionController {


    constructor(
        private constructionsBusiness: ConstructionsBusiness
    ) { }

    /**************************PEGA TODAS AS OBRAS E SEUS APARTAMENTOS************************* */
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

    /********************************PEGA TODAS AS OBRAS***************************************** */
    GetAllConstructions = async (req: Request, res: Response) => {
        const input: authenticatorToken = {
            token: req.headers.authorization
        }

        try {
            const allConstructions = await this.constructionsBusiness.GetAllConstructions(input)

            res.status(200).send({ allConstructions })
        } catch (error: any) {
            res.status(400).send(error.message)
        }
    }

    /********************INSERE NOVOS APARTAMENTOS************* */
    InsertApartments = async (req: Request, res: Response) => {
        const input: apartmentsDTO = {
            token: req.headers.authorization,
            id: req.params.obra_id
        }

        const { numero_ap, andar, limpeza_completa, foto } = req.body

        const ap: any = {
            numero_ap: numero_ap, andar: andar, limpeza_completa: limpeza_completa, foto: foto
        }

        try {

            console.log(input.id)

            const result = await this.constructionsBusiness.InsertApartments(input, ap)

            res.status(200).send({ result })


        } catch (error: any) {
            res.status(400).send(error.message)
        }
    }


    /***************CRIA NOVAS OBRAS******************* */

    InsertNewConstructions = async (req: Request, res: Response) => {
        const input: authenticatorToken = {
            token: req.headers.authorization
        }
        const body: any = req.body
        // const { nome_obra, qty_andares, qty_ap_andar, responsavel } = req.body

        console.log(body)

        try {
            const message = await this.constructionsBusiness.InsertNewConstructions(input, body)

            res.status(200).send({ message })
        } catch (error: any) {
            res.status(400).send(error.message)
        }

    }

    EditConstruction = async (req: Request, res: Response) => {
        const input: authenticatorToken = {
            token: req.headers.authorization
        }
        const body = req.body
        const id = req.params.id

        try {
            const message = await this.constructionsBusiness.EditConstructions(input, id, body)

            res.status(200).send({ message })
        } catch (error: any) {
            res.status(400).send(error.message)
        }
    }





}