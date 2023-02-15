import { Request, Response } from "express"
import UserBusiness, { loginInputDTO } from "../Business/UserBusiness"
import UserDB from "../Data/UserDb"
import { UserData, UserDTO } from "../model/user"

export default class UserController {
    private userBusiness: UserBusiness

    constructor() {
        this.userBusiness = new UserBusiness(new UserDB)
    }

    SignUp = async (req: Request, res: Response) => {
        const { name, email, password, role } = req.body

        const inputDTO: UserDTO = UserDTO.toUserDTOModel(name, email, password, role)

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

            const input: loginInputDTO = {
                email: req.body.email,
                password: req.body.password
            }

            const sendKey = await this.userBusiness.Login(input)



            res.status(200).send({ message: message, sendKey: sendKey })

        } catch (error: any) {
            res.status(error.code || 400).send({ error: error.message })
        }
    }

}