import express from "express"
import ApartmentsBusiness from "../Business/ApartmentsBusiness"
import ApartmentsController from "../Controller/ApartmentsController"
import ApartmentsDB from "../Data/ApartmentsDB"
import Authenticator from "../services/Authenticator"
import IdGenerator from "../services/GenerateId"

export const apartmentsRouter = express.Router() 

const apartmentsController = new ApartmentsController(new ApartmentsBusiness(
    new Authenticator,
    new ApartmentsDB,
    new IdGenerator
))

apartmentsRouter.get("/:id", apartmentsController.GetApartmensById)