import { User, UserData, UserDTO, USER_ROLES } from "../model/user";
import UserRepository from "./UserRespository";
import IdGenerator from "../services/GenerateId";
import Authenticator from "../services/Authenticator";
import { CustomError } from "../Error/CustomError";
import HashManager from "../services/HashManager";

export type loginInputDTO = {
    email: string,
    password: string
}

export default class UserBusiness {
    private userDB: UserRepository
    private idGenerator: IdGenerator
    private hashManager: HashManager
    private authenticator: Authenticator

    constructor(
        userImplementation: UserRepository
    ) {
        this.userDB = userImplementation
        this.idGenerator = new IdGenerator()
        this.hashManager = new HashManager()
        this.authenticator = new Authenticator()

    }

    SignUp = async (input: UserDTO): Promise<string | undefined> => {
        try {
            if (!input.GetName || !input.GetEmail || !input.GetPassword) {
                const message = '"name", "email" and "password" must be provided'
                throw new CustomError(400, message)
            }

            const verifyEmail: any = input.GetEmail()
            const verifyRole: any = input.GetRole()
            const verifyPassword: any = input.GetPassword()



            if (verifyEmail.indexOf("@") === -1) {
                throw new CustomError(400, "Inválid email!");
            }


            const user: any = await this.userDB.userByEmailSignUp(verifyEmail)

            if (user !== null) {
                throw new CustomError(409, "Email already registered")
            }

            const id: string = this.idGenerator.generate()
            const role: USER_ROLES = verifyRole === 'admin' ? USER_ROLES.ADMIN : USER_ROLES.COLLAB

            const cypherPassword = await this.hashManager.hash(verifyPassword);

            const newUser: any = {
                id: id,
                name: input.GetName(),
                email: input.GetEmail(),
                password: cypherPassword,
                role: input.GetRole()
            }

            const newUserDB = User.toUserModel(newUser)

            await this.userDB.signup(newUserDB)

            const token: string = this.authenticator.generateToken({ id, role })

            return token;
        } catch (error) {
            console.log(error)
        }

    }

    Login = async (input: loginInputDTO): Promise<any> => {

        try {
            if (!input.email || !input.password) {
                const message = '"email" and "password" must be provided'
                throw new CustomError(400, message)
            }

            console.log("iniciei o business")
            const queryResult: any = await this.userDB.userByEmailLogin(input.email)

            if (!queryResult) {
                let message = "User Not Found"
                throw new CustomError(404, message)
            }

            const user: any = {
                id: queryResult.GetId(),
                name: queryResult.GetName(),
                email: queryResult.GetEmail(),
                password: queryResult.GetPassword(),
                role: queryResult.GetRole()
            }

            console.log(user.password)

            const passwordIsCorrect: any = await this.hashManager.compareHash(input.password, user.password)


            if (passwordIsCorrect === false) {
                throw new CustomError(401, "Invalid credentials")
            }

            const token: string = this.authenticator.generateToken({
                id: user.id,
                role: user.role
            })

            const returnKey = {
                token: token,
                role: user.role,
                id: queryResult.GetId()
            }

            return returnKey


        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message)

        }

    }
}