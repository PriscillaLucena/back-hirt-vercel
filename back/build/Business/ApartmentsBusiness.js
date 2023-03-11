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
const apartments_1 = require("../model/apartments");
class ApartmentsBusiness {
    constructor(authenticator, apartmentsDB, idGenerator) {
        this.authenticator = authenticator;
        this.apartmentsDB = apartmentsDB;
        this.idGenerator = idGenerator;
        this.GetApartmentsById = (input, obra_id) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!input.token) {
                    throw new CustomError_1.CustomError(400, "'token' must be provided");
                }
                const tokenData = this.authenticator.getTokenData(input.token);
                console.log("token", tokenData);
                if (tokenData.role !== "collab") {
                    throw new CustomError_1.CustomError(400, "'token' must be provided");
                }
                const queryResult = yield this.apartmentsDB.GetApartmentsById(input, obra_id);
                console.log(queryResult);
                return queryResult;
            }
            catch (error) {
            }
        });
        this.GetConstrucById = (input) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!input.token) {
                    throw new CustomError_1.CustomError(400, "'token' must be provided");
                }
                const tokenData = this.authenticator.getTokenData(input.token);
                if (tokenData.role !== "collab") {
                    throw new CustomError_1.CustomError(400, "'token' must be provided");
                }
                const queryResult = yield this.apartmentsDB.GetConstrucById(input);
                console.log(queryResult);
                return queryResult;
            }
            catch (error) {
            }
        });
        this.GetAllConstructions = (input) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!input.token) {
                    throw new CustomError_1.CustomError(400, "'token' must be provided");
                }
                const tokenData = this.authenticator.getTokenData(input.token);
                console.log("token", tokenData);
                if (tokenData.role !== "collab") {
                    throw new CustomError_1.CustomError(400, "You need to be an ADMIN to access this page");
                }
                const queryResult = yield this.apartmentsDB.GetConstructions();
                return queryResult;
            }
            catch (error) {
                let message = error.sqlMessage || error.message;
                return message;
            }
        });
        this.NewApartment = (ap, input) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!input.token) {
                    throw new CustomError_1.CustomError(400, "'token' must be provided");
                }
                const tokenData = this.authenticator.getTokenData(input.token);
                console.log("token", tokenData);
                if (tokenData.role !== "collab") {
                    throw new CustomError_1.CustomError(400, "'token' must be provided");
                }
                if (!ap.numero_ap || !ap.andar || !ap.limpeza_completa || !ap.data || !ap.foto || !ap.obra_id || !ap.user_id) {
                    throw new CustomError_1.CustomError(400, "body must be provided!");
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
                    obra_id: input.id,
                    user_id: input.id
                };
                const newAp = apartments_1.ApartmentNew.toApartmentNewModel(body);
            }
            catch (error) {
            }
        });
    }
}
exports.default = ApartmentsBusiness;
//# sourceMappingURL=ApartmentsBusiness.js.map