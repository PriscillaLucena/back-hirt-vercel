import express from "express";
import ConstructionsBusiness from "../Business/ConstructionsBusiness";
import  ConstructionController  from "../Controller/ConstructionsController";
import ConstructionsDB from "../Data/ConstructionsDB";
import Authenticator from "../services/Authenticator";
import IdGenerator from "../services/GenerateId";



export const ConstructionsRouter = express.Router();

const constructionController = new ConstructionController(
    new ConstructionsBusiness(
    new Authenticator(),
    new ConstructionsDB(),
    new IdGenerator()
    ))


ConstructionsRouter.post("/new", constructionController.InsertNewConstructions)     
ConstructionsRouter.post("/:obra_id", constructionController.InsertApartments)       
ConstructionsRouter.put("/editConstruction/:id", constructionController.InsertApartments)       
ConstructionsRouter.get("/info/:id", constructionController.GetApartments)
ConstructionsRouter.get("/all", constructionController.GetAllConstructions)    
