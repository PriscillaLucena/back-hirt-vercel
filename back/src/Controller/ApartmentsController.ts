import { Request, Response } from "express";
import ApartmentsBusiness, { inputApDTO } from "../Business/ApartmentsBusiness";
import { authenticatorToken } from "../model/authenticToken";

export default class ApartmentsController{
    constructor(
        private apartmentBusiness: ApartmentsBusiness
    ){}

    GetApartmensById = async(req: Request, res: Response)=>{
        const input: inputApDTO = {
            token: req.headers.authorization,
            id: req.params.id
        }

        const obra_id = req.params.obra_id

        console.log("obra id", obra_id)

        try {

            console.log("iniciei o controller")
            const apartments = await this.apartmentBusiness.GetApartmentsById(input, obra_id)

            res.status(200).send({apartments})
            
        } catch (error) {
            
        }
    }

    GetConstrucById = async(req: Request, res: Response)=>{
        const input: inputApDTO = {
            token: req.headers.authorization,
            id: req.params.id
        }

        try {

            console.log("iniciei o controller")
            const apartments = await this.apartmentBusiness.GetConstrucById(input)

            res.status(200).send({apartments})
            
        } catch (error) {
            
        }
    }

    GetAllConstructions = async (req: Request, res: Response) => {
        const input: authenticatorToken = {
            token: req.headers.authorization
        }

        try {
            const apartments = await this.apartmentBusiness.GetAllConstructions(input)

            res.status(200).send({ apartments })
        } catch (error: any) {
            res.status(400).send(error.message)
        }
    }

    NewApartment = async(req: Request, res: Response)=>{
        const input: inputApDTO = {
            token: req.headers.authorization,
            id: req.params.id
        }

        const body = {
            numero_ap: req.body.numero_ap,
            andar: req.body.andar,
            limpeza_completa: req.body.limpeza_completa,
            data: req.body.data,
            foto: req.body.foto,
            obra_id: req.body.obra_id,
            user_id: input.id
        }

        try {
            const result = await this.apartmentBusiness.NewApartment(body, input)

        } catch (error) {
            
        }
    }

    EditClean = async(req: Request, res: Response) =>{
        console.log("iniciei as fotos")

       if(req.file){
        return res.json({
            erro: false,
            mensagem: "upload realizado com sucesso"
        })
       }

       return res.status(400).json({
        erro: true,
        mesnagem: "Erro: upload não realizado"
       })
    }
}