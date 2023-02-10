import { user } from "../model/user"


export default interface UserRepository{
    signup(user: user): Promise<user>
    userByEmail(email: string): Promise<any>
}