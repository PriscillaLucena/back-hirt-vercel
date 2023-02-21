import { Request, Response } from "express";
import ApartmentsBusiness, { inputApDTO } from "../Business/ApartmentsBusiness";

export default class ApartmentsController{
    constructor(
        private apartmentBusiness: ApartmentsBusiness
    ){}


    GetApartmensById = async(req: Request, res: Response)=>{
        const input: inputApDTO = {
            token: req.headers.authorization,
            id: req.params.id
        }

        try {
            const apartments = await this.apartmentBusiness.GetApartmentsById(input)
            
        } catch (error) {
            
        }
    }
}