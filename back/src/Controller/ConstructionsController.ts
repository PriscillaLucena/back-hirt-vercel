import { Request, Response } from "express";
import ConstructionsBusiness, { apartmentsDTO } from "../Business/ConstructionsBusiness"

export default class ConstructionController {
   

    constructor(
        private constructionsBusiness: ConstructionsBusiness
    ){ }

    GetApartments = async (req: Request, res: Response) => {
        
        const input: apartmentsDTO = {
            token: req.headers.authorization,
            id: req.params.id
        }

        try {

            console.log("iniciei o controller")
            const apartments = await this.constructionsBusiness.GetApartments(input)

            res.status(200).send({ apartments })
        } catch (error: any) {
            let message = error.sqlMessage || error.message
         res.statusCode = 400

         res.send({ message })
        }
    }

}