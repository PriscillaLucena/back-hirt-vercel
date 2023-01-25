import { CustomError } from "../error/CustomError";
import { user, userData, USER_ROLES } from "../model/user";
import UserRepository from "./UserRespository";
import IdGenerator from "../services/GenerateId";
import HashManager from "../services/HashManager";
import Authenticator from "../services/Authenticator";


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
        const role: USER_ROLES = input.role === 'ADMIN'? USER_ROLES.ADMIN : USER_ROLES.NORMAL

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

}