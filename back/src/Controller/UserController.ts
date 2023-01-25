import { Request, Response } from "express"
import UserBusiness from "../Business/UserBusiness"
import UserDB from "../Data/UserDb"
import { userData } from "../model/user"

export default class UserController {
    private userBusiness: UserBusiness

    constructor() {
        this.userBusiness = new UserBusiness(new UserDB)
     }

    SignUp = async (req: Request, res: Response) => {
        const { name, email, password, role } = req.body

        const inputDTO: userData = { name, email, password, role }

        try {

            const token = await this.userBusiness.SignUp(inputDTO)

            res.send({ token })


        } catch (error: any) {
            res.status(400).send(error.message)
        }
    }

}