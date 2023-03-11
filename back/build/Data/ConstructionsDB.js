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
const BaseDatabase_1 = __importDefault(require("./BaseDatabase"));
const constructions_1 = __importDefault(require("../model/constructions"));
const CustomError_1 = require("../Error/CustomError");
class ConstructionsDB extends BaseDatabase_1.default {
    constructor() {
        super(...arguments);
        this.GetConstructionsById = (id) => __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("iniciei o DB", id);
                let building = yield ConstructionsDB.connection.raw(`SELECT * FROM Novas_obras WHERE id = "${id}"`);
                const result = yield ConstructionsDB.connection.raw(`
            SELECT obra_id, apartamentos.id as ap_id,
            numero_ap, andar, limpeza_completa,
            data, foto, responsavel, 
            qty_andares, qty_ap_andar FROM apartamentos 
            JOIN Novas_obras ON apartamentos.obra_id = Novas_obras.id
            `);
                console.log("result ", result[0]);
                const result2 = result[0].filter((a) => { return a.obra_id === id; }).map((a) => a);
                let array = [...result2];
                const input = {
                    obra_id: building[0][0].id,
                    nome_obra: building[0][0].nome_obra,
                    qty_andares: building[0][0].qty_andares,
                    qty_ap_andar: building[0][0].qty_ap_andar,
                    responsavel: building[0][0].responsavel,
                    apartamentos: array
                };
                console.log("INPUT", input);
                const newConstruction = constructions_1.default.toConstructionModel(input);
                return newConstruction;
            }
            catch (error) {
            }
        });
        this.GetConstructions = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield ConstructionsDB.connection.raw(`SELECT * FROM Novas_obras`);
                console.log("obras", result);
                return result[0];
            }
            catch (error) {
            }
        });
        this.InsertApartments = (body) => __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("iniciei o DB");
                console.log(body);
                yield ConstructionsDB.connection("apartamentos")
                    .insert(body);
                return ("success!");
            }
            catch (error) {
            }
        });
        this.InsertNewConstructions = (input) => __awaiter(this, void 0, void 0, function* () {
            let message = 'Nova obra criada!';
            try {
                yield ConstructionsDB.connection('Novas_obras')
                    .insert({
                    id: input.GetId(),
                    nome_obra: input.GetNome_obra(),
                    qty_andares: input.GetQty_andares(),
                    qty_ap_andar: input.GetQty_ap_andar(),
                    qty_total_ap: input.GetQty_Total_ap(),
                    responsavel: input.GetResponsavel()
                });
                return message;
            }
            catch (error) {
                throw new CustomError_1.CustomError(400, error.sqlMessage || error.message);
            }
        });
        this.EditConstructions = (field, body, id) => __awaiter(this, void 0, void 0, function* () {
            try {
                const message = "Obra editada com sucesso!";
                yield ConstructionsDB.connection.raw(`UPDATE Novas_obras SET ${field} = "${body}" WHERE id = "${id}"; `);
                return message;
            }
            catch (error) {
                throw new CustomError_1.CustomError(400, error.sqlMessage || error.message);
            }
        });
    }
}
exports.default = ConstructionsDB;
//# sourceMappingURL=ConstructionsDB.js.map