import express from "express"
import multer from "multer"
import ApartmentsBusiness from "../Business/ApartmentsBusiness"
import ApartmentsController from "../Controller/ApartmentsController"
import ApartmentsDB from "../Data/ApartmentsDB"
import Authenticator from "../services/Authenticator"
import IdGenerator from "../services/GenerateId"
const uploadUser = require("../../middlewares/uploadImage")

export const apartmentsRouter = express.Router() 

const apartmentsController = new ApartmentsController(new ApartmentsBusiness(
    new Authenticator,
    new ApartmentsDB,
    new IdGenerator
))


apartmentsRouter.get("/all/:id/:obra_id", apartmentsController.GetApartmensById)
apartmentsRouter.get("/construc/:id", apartmentsController.GetConstrucById)
apartmentsRouter.get("/constructions/all", apartmentsController.GetAllConstructions)
apartmentsRouter.post("/newAp", apartmentsController.NewApartment)
apartmentsRouter.post("/fotos", uploadUser.single('avatar'), apartmentsController.EditClean)
