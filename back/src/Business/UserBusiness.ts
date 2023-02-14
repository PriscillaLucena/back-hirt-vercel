import { user, userData, USER_ROLES } from "../model/user";
import UserRepository from "./UserRespository";
import IdGenerator from "../services/GenerateId";
import Authenticator from "../services/Authenticator";

import { CustomError } from "../Error/CustomError";
import * as bcrypt from "bcryptjs";
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

    SignUp = async (input: userData): Promise<string> => {
        if (!input.name || !input.email || !input.password) {
            const message = '"name", "email" and "password" must be provided'
            throw new CustomError(400, message)
        }

        if (input.email.indexOf("@") === -1) {
            throw new CustomError(400, "Inválid email!");
        }

        const user: any = await this.userDB.userByEmail(input.email)

        if (user) {
            throw new CustomError(409, "Email already registered")
        }

        const id: string = this.idGenerator.generate()
        const role: USER_ROLES = input.role === 'admin' ? USER_ROLES.ADMIN : USER_ROLES.NORMAL

        const cypherPassword = await this.hashManager.hash(input.password);

        const newUser: user = {
            id: id,
            name: input.name,
            email: input.email,
            password: cypherPassword,
            role: input.role
        }

        await this.userDB.signup(newUser)

        const token: string = this.authenticator.generateToken({ id, role })

        return token;

    }

    Login = async (input: loginInputDTO): Promise<any> => {

        try {
            if (!input.email || !input.password) {


                const message = '"email" and "password" must be provided'
                throw new CustomError(400, message)
            }

            // console.log(input)

            const queryResult: any = await this.userDB.userByEmail(input.email)


            if (!queryResult) {
                // console.log("deu ruim!")
                let message = "User Not Found"
                throw new CustomError(404, message)
            }

            // const user: user = {
            //     id: queryResult.id,
            //     name: queryResult.nome,
            //     email: queryResult.email,
            //     password: queryResult.senha.toString(),
            //     role: queryResult.tipo_acesso
            // }

            console.log(queryResult.senha, input.password)


            const passwordIsCorrect: any =  await this.hashManager.compareHash(input.password, queryResult.senha)

            // bcrypt.compare(input.password, queryResult.senha)

            

            console.log(passwordIsCorrect)

            if (passwordIsCorrect === false) {
                throw new CustomError(401, "Invalid credentials")
            }

            // const token: string = this.authenticator.generateToken({
            //     id: user.id,
            //     role: user.role
            // })

            // const returnKey = {
            //     token: token,
            //     role: user.role
            // }

            // console.log()

            return passwordIsCorrect


        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message)

        }

    }
}