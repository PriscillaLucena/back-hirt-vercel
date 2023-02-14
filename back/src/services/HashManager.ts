import * as bcrypt from "bcryptjs";
import { CustomError } from "../Error/CustomError";


export default class HashManager {

  hash = async (plainText: string): Promise<string> => {
    const rounds = Number(process.env.BCRYPT_COST);
    const salt = await bcrypt.genSalt(rounds);
    return bcrypt.hash(plainText, salt)
  }

  public compareHash = async (s: string, hash: string) => {
    const result: any = bcrypt.compare(s, hash)
    // console.log("result no hash", result)
    return bcrypt.compare(s, hash);
  }
}

// , ((err: Error, success: boolean)=> Promise <void>)