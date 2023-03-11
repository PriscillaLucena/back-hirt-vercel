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
const GenerateId_1 = __importDefault(require("../services/GenerateId"));
const Authenticator_1 = __importDefault(require("../services/Authenticator"));
const CustomError_1 = require("../Error/CustomError");
const HashManager_1 = __importDefault(require("../services/HashManager"));
class UserBusiness {
    constructor(userImplementation) {
        this.SignUp = (input) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!input.GetName || !input.GetEmail || !input.GetPassword) {
                    const message = '"name", "email" and "password" must be provided';
                    throw new CustomError_1.CustomError(400, message);
                }
                const verifyEmail = input.GetEmail();
                const verifyRole = input.GetRole();
                const verifyPassword = input.GetPassword();
                if (verifyEmail.indexOf("@") === -1) {
                    throw new CustomError_1.CustomError(400, "Inválid email!");
                }
                const user = yield this.userDB.userByEmailSignUp(verifyEmail);
                if (user !== null) {
                    throw new CustomError_1.CustomError(409, "Email already registered");
                }
                const id = this.idGenerator.generate();
                const role = verifyRole === 'admin' ? user_1.USER_ROLES.ADMIN : user_1.USER_ROLES.COLLAB;
                const cypherPassword = yield this.hashManager.hash(verifyPassword);
                const newUser = {
                    id: id,
                    name: input.GetName(),
                    email: input.GetEmail(),
                    password: cypherPassword,
                    role: input.GetRole()
                };
                const newUserDB = user_1.User.toUserModel(newUser);
                yield this.userDB.signup(newUserDB);
                const token = this.authenticator.generateToken({ id, role });
                return token;
            }
            catch (error) {
                console.log(error);
            }
        });
        this.Login = (input) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!input.email || !input.password) {
                    const message = '"email" and "password" must be provided';
                    throw new CustomError_1.CustomError(400, message);
                }
                console.log("iniciei o business");
                const queryResult = yield this.userDB.userByEmailLogin(input.email);
                if (!queryResult) {
                    let message = "User Not Found";
                    throw new CustomError_1.CustomError(404, message);
                }
                const user = {
                    id: queryResult.GetId(),
                    name: queryResult.GetName(),
                    email: queryResult.GetEmail(),
                    password: queryResult.GetPassword(),
                    role: queryResult.GetRole()
                };
                console.log(user.password);
                const passwordIsCorrect = yield this.hashManager.compareHash(input.password, user.password);
                if (passwordIsCorrect === false) {
                    throw new CustomError_1.CustomError(401, "Invalid credentials");
                }
                const token = this.authenticator.generateToken({
                    id: user.id,
                    role: user.role
                });
                const returnKey = {
                    token: token,
                    role: user.role,
                    id: queryResult.GetId()
                };
                return returnKey;
            }
            catch (error) {
                throw new CustomError_1.CustomError(error.statusCode, error.message);
            }
        });
        this.userDB = userImplementation;
        this.idGenerator = new GenerateId_1.default();
        this.hashManager = new HashManager_1.default();
        this.authenticator = new Authenticator_1.default();
    }
}
exports.default = UserBusiness;
//# sourceMappingURL=UserBusiness.js.map