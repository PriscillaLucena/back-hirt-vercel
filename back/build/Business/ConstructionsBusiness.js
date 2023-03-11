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
Object.defineProperty(exports, "__esModule", { value: true });
const CustomError_1 = require("../Error/CustomError");
const constructions_1 = require("../model/constructions");
class ConstructionsBusiness {
    constructor(authenticator, constructionsDB, idGenerator) {
        this.authenticator = authenticator;
        this.constructionsDB = constructionsDB;
        this.idGenerator = idGenerator;
        this.GetApartments = (input) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!input.token) {
                    throw new CustomError_1.CustomError(400, "'token' must be provided");
                }
                const tokenData = this.authenticator.getTokenData(input.token);
                if (tokenData.role !== "admin") {
                    throw new CustomError_1.CustomError(400, "'token' must be provided");
                }
                const queryResult = yield this.constructionsDB.GetConstructionsById(input.id);
                return queryResult;
            }
            catch (error) {
                let message = error.sqlMessage || error.message;
                return message;
            }
        });
        this.GetAllConstructions = (input) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!input.token) {
                    throw new CustomError_1.CustomError(400, "'token' must be provided");
                }
                const tokenData = this.authenticator.getTokenData(input.token);
                console.log("token", tokenData);
                if (tokenData.role !== "admin") {
                    throw new CustomError_1.CustomError(400, "You need to be an ADMIN to access this page");
                }
                const queryResult = yield this.constructionsDB.GetConstructions();
                return queryResult;
            }
            catch (error) {
                let message = error.sqlMessage || error.message;
                return message;
            }
        });
        this.InsertApartments = (input, ap) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!input.token) {
                    throw new CustomError_1.CustomError(400, "'token' must be provided");
                }
                const tokenData = this.authenticator.getTokenData(input.token);
                if (!tokenData) {
                    throw new CustomError_1.CustomError(401, "Unauthorized");
                }
                if (tokenData.role !== "admin") {
                    throw new CustomError_1.CustomError(400, "You need to be an ADMIN to access this page");
                }
                const id = this.idGenerator.generate();
                const timeElapsed = Date.now();
                const today = new Date(timeElapsed);
                let options = { year: 'numeric', month: '2-digit', day: 'numeric' };
                let data1 = today.toLocaleString('ko', options);
                let data2 = data1.replace(/. /g, '/');
                let data = data2.replace('.', '');
                const body = {
                    id: id,
                    numero_ap: ap.numero_ap,
                    andar: ap.andar,
                    limpeza_completa: ap.limpeza_completa,
                    data: data,
                    foto: ap.foto,
                    obra_id: input.id
                };
                const queryResult = yield this.constructionsDB.InsertApartments(body);
                return queryResult;
            }
            catch (error) {
                let message = error.sqlMessage || error.message;
                return message;
            }
        });
        this.InsertNewConstructions = (input, body) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!input.token) {
                    throw new CustomError_1.CustomError(400, "'token' must be provided");
                }
                const tokenData = this.authenticator.getTokenData(input.token);
                if (!tokenData) {
                    throw new CustomError_1.CustomError(401, "Unauthorized");
                }
                if (tokenData.role !== "admin") {
                    throw new CustomError_1.CustomError(400, "You need to be an ADMIN to access this page");
                }
                const id = this.idGenerator.generate();
                const qty_total_ap = body.qty_andares * body.qty_ap_andar;
                const obraInput = {
                    id: id,
                    nome_obra: body.nome_obra,
                    qty_andares: body.qty_andares,
                    qty_ap_andar: body.qty_ap_andar,
                    qty_total_ap: qty_total_ap,
                    responsavel: body.responsavel
                };
                const newConstruction = constructions_1.ConstructionNew.toConstructionNewModel(obraInput);
                const result = yield this.constructionsDB.InsertNewConstructions(newConstruction);
                return result;
            }
            catch (error) {
            }
        });
        this.EditConstructions = (input, id, body) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!input.token) {
                    throw new CustomError_1.CustomError(400, "'token' must be provided");
                }
                if (!id) {
                    throw new CustomError_1.CustomError(400, "'id' must be provided");
                }
                const tokenData = this.authenticator.getTokenData(input.token);
                if (!tokenData) {
                    throw new CustomError_1.CustomError(401, "Unauthorized");
                }
                if (tokenData.role !== "admin") {
                    throw new CustomError_1.CustomError(400, "You need to be an ADMIN to access this page");
                }
                if (!!body.nome_obra) {
                    const field = "nome_obra";
                    const result = yield this.constructionsDB.EditConstructions(field, body.nome_obra, id);
                }
                if (!!body.qty_andares) {
                    const field = "qty_andares";
                    const result = yield this.constructionsDB.EditConstructions(field, body.qty_andares, id);
                }
                if (!!body.qty_ap_andar) {
                    const field = "qty_ap_andar";
                    const result = yield this.constructionsDB.EditConstructions(field, body.qty_ap_andar, id);
                }
                if (!!body.responsavel) {
                    const field = "responsavel";
                    const result = yield this.constructionsDB.EditConstructions(field, body.responsavel, id);
                }
                const message = "obra editada com sucesso";
                return message;
            }
            catch (error) {
            }
        });
    }
}
exports.default = ConstructionsBusiness;
//# sourceMappingURL=ConstructionsBusiness.js.map