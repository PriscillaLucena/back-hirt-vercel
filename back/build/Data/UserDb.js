"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../model/user");
const BaseDatabase_1 = __importDefault(require("./BaseDatabase"));
class UserDB extends BaseDatabase_1.default {
    constructor() {
        super(...arguments);
        this.signup = (user) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield BaseDatabase_1.default.connection('Login_Hirt_Admin')
                    .insert({
                    id: user.GetId(),
                    nome: user.GetName(),
                    email: user.GetEmail(),
                    senha: user.GetPassword(),
                    tipo_acesso: user.GetRole()
                });
                return user;
            }
            catch (error) {
                throw new Error("Error creating user in database");
            }
        });
        this.userByEmailSignUp = (email) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield BaseDatabase_1.default.connection('Login_Hirt_Admin')
                    .select("*")
                    .where({ email });
                if (result) {
                    return null;
                }
                const input = {
                    id: result[0].id,
                    name: result[0].nome,
                    email: result[0].email,
                    password: result[0].senha,
                    role: result[0].tipo_acesso,
                };
                console.log(input);
                const userResult = user_1.User.toUserModel(input);
                return userResult;
            }
            catch (error) {
                throw new Error(error.slqMessage);
            }
        });
        this.userByEmailLogin = (email) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield BaseDatabase_1.default.connection('Login_Hirt_Admin')
                    .select("*")
                    .where({ email });
                const input = {
                    id: result[0].id,
                    name: result[0].nome,
                    email: result[0].email,
                    password: result[0].senha,
                    role: result[0].tipo_acesso,
                };
                console.log(input);
                const userResult = user_1.User.toUserModel(input);
                return userResult;
            }
            catch (error) {
                throw new Error(error.slqMessage);
            }
        });
    }
}
exports.default = UserDB;
//# sourceMappingURL=UserDb.js.map