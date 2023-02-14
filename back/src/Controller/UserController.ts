import { Request, Response } from "express"
import UserBusiness, { loginInputDTO } from "../Business/UserBusiness"
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
        console.log("iniciou o signup")
        try {

            const token = await this.userBusiness.SignUp(inputDTO)

            res.send({ token })


        } catch (error: any) {
            res.status(400).send(error.message)
        }
    }

    Login = async (req: Request, res: Response) => {
        try {
            let message = "Success!"
            // const { email, password } = req.body

            const input: loginInputDTO = {
                email: req.body.email,
                password: req.body.password
            }

            // console.log(input)

            const sendKey = await this.userBusiness.Login(input)

            

            res.status(200).send({ message })

        } catch (error: any) {
            res.status(error.code || 400).send({ error: error.message })
        }
    }

}