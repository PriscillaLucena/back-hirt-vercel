"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRouter = void 0;
const express_1 = __importDefault(require("express"));
const UserController_1 = __importDefault(require("../Controller/UserController"));
exports.UserRouter = express_1.default.Router();
const userController = new UserController_1.default();
exports.UserRouter.post("/login", userController.Login);
exports.UserRouter.post("/signup", userController.SignUp);
//# sourceMappingURL=UserRouter.js.map