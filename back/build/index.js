"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const UserRouter_1 = require("./Routes/UserRouter");
const ConstructionsRouter_1 = require("./Routes/ConstructionsRouter");
const ApartmentsRouter_1 = require("./Routes/ApartmentsRouter");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use("/user", UserRouter_1.UserRouter);
app.use("/construction", ConstructionsRouter_1.ConstructionsRouter);
app.use("/apartments", ApartmentsRouter_1.apartmentsRouter);
const server = app.listen(3003, () => {
    if (server) {
        const address = server.address();
        console.log(`Servidor rodando em http://localhost:${address.port}`);
    }
    else {
        console.error(`Falha ao rodar o servidor.`);
    }
});
//# sourceMappingURL=index.js.map