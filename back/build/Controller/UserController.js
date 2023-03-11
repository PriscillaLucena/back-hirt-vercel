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
const UserBusiness_1 = __importDefault(require("../Business/UserBusiness"));
const UserDb_1 = __importDefault(require("../Data/UserDb"));
const user_1 = require("../model/user");
class UserController {
    constructor() {
        this.SignUp = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const input = { name: req.body.name, email: req.body.email, password: req.body.password, role: req.body.role };
            const inputDTO = user_1.UserDTO.toUserDTOModel(req.body.name, req.body.email, req.body.password, req.body.role);
            try {
                const token = yield this.userBusiness.SignUp(inputDTO);
                res.send({ token });
            }
            catch (error) {
                res.status(400).send(error.message);
            }
        });
        this.Login = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                let message = "Success!";
                const input = {
                    email: req.body.email,
                    password: req.body.password
                };
                const sendKey = yield this.userBusiness.Login(input);
                res.status(200).send({ message: message, sendKey: sendKey });
            }
            catch (error) {
                res.status(error.code || 400).send({ error: error.message });
            }
        });
        this.userBusiness = new UserBusiness_1.default(new UserDb_1.default);
    }
}
exports.default = UserController;
//# sourceMappingURL=UserController.js.map