import express from "express";
import UserController from "../Controller/UserController";


export const UserRouter = express.Router();

const userController = new UserController()

UserRouter.post("/signup", userController.SignUp)