// import UserRepository from "../business/UserRepository";
import UserRepository from "../Business/UserRespository";
import { User } from "../model/user";

import BaseDatabase from "./BaseDatabase";

export default class UserDB extends BaseDatabase implements UserRepository {

    signup = async (user: User): Promise<User> => {
        try {
            await BaseDatabase.connection('Login_Hirt_Admin')
                .insert({
                    id: user.GetId(),
                    nome: user.GetName(),
                    email: user.GetEmail(),
                    senha: user.GetPassword(),
                    tipo_acesso: user.GetRole()
                })
            return user
        } catch (error: any) {
            throw new Error("Error creating user in database")
        }

    }

    userByEmailSignUp = async (email: string): Promise<User | null> => {
        try {
            const result: any = await BaseDatabase.connection('Login_Hirt_Admin')
                .select("*")
                .where({ email });

            if(result){
                return null
            }    

            const input = {
                id: result[0].id,
                name: result[0].nome,
                email: result[0].email,
                password: result[0].senha,
                role: result[0].tipo_acesso,
            }    

            console.log(input)


            const userResult = User.toUserModel(input)    

            return  userResult

        } catch (error: any) {
            throw new Error(error.slqMessage)
        }

    }

    userByEmailLogin = async (email: string): Promise<User | null> => {
        try {
            const result: any = await BaseDatabase.connection('Login_Hirt_Admin')
                .select("*")
                .where({ email });   

            const input = {
                id: result[0].id,
                name: result[0].nome,
                email: result[0].email,
                password: result[0].senha,
                role: result[0].tipo_acesso,
            }    

            console.log(input)


            const userResult = User.toUserModel(input)    

            return  userResult

        } catch (error: any) {
            throw new Error(error.slqMessage)
        }

    }


} 