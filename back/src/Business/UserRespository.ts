import { User } from "../model/user"


export default interface UserRepository{
    signup(user: User): Promise<User>
    userByEmailSignUp(email: string): Promise<any>
    userByEmailLogin(email: string): Promise<any>
}