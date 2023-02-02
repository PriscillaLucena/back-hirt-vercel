import express from "express";
import ConstructionsBusiness from "../Business/ConstructionsBusiness";
import  ConstructionController  from "../Controller/ConstructionsController";
import ConstructionsDB from "../Data/ConstructionsDB";
import Authenticator from "../services/Authenticator";



export const ConstructionsRouter = express.Router();

const constructionController = new ConstructionController(
    new ConstructionsBusiness(
    new Authenticator(),
    new ConstructionsDB()
    ))

ConstructionsRouter.get("/info/:id", constructionController.GetApartments)    