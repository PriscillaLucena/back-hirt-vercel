// import UserRepository from "../business/UserRepository";
import UserRepository from "../Business/UserRespository";
import { user } from "../model/user";

import BaseDB from "./BaseDB";

export default class UserDB extends BaseDB implements UserRepository {
    signup = async (user: user): Promise<user> => {
        try {
            await UserDB.connection('Login_Hirt_Admin')
                .insert({
                    id: user.id,
                    nome: user.name,
                    email: user.email,
                    senha: user.password,
                    tipo_acesso: user.role
                })
            return user
        } catch (error: any) {
            throw new Error("Error creating user in database")
        }

    }

    userByEmail = async (email: string): Promise<user | null> => {
        try {
            const result: user[] = await UserDB.connection('Login_Hirt_Admin')
                .select("*")
                .where({ email });

            return  result[0]

        } catch (error: any) {
            throw new Error(error.slqMessage)
        }

    }


} 