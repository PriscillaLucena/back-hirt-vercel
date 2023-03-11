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
class ApartmentsDB extends BaseDatabase_1.default {
    constructor() {
        super(...arguments);
        this.GetApartmentsById = (input, id) => __awaiter(this, void 0, void 0, function* () {
            try {
                const apartment = yield ApartmentsDB.connection.raw(`SELECT * FROM apartamentos WHERE user_id = "${input.id}"`);
                const apartmentResult = apartment[0].filter((a) => { return a.obra_id === id; }).map((a) => { return a; });
                console.log(apartmentResult);
                return apartmentResult;
            }
            catch (error) {
            }
        });
        this.GetConstrucById = (input) => __awaiter(this, void 0, void 0, function* () {
            try {
                const apartment = yield ApartmentsDB.connection.raw(`SELECT nome_obra, obra_id FROM apartamentos WHERE user_id = "${input.id}"`);
                let set1 = [];
                console.log("aps", apartment.forEach((item) => {
                    let duplicated = set1.findIndex((redItem) => {
                        return item.nome_obra == redItem.nome_obra;
                    }) > -1;
                    if (!duplicated) {
                        set1.push(item);
                    }
                }));
                return apartment[0];
            }
            catch (error) {
            }
        });
        this.GetConstructions = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield ApartmentsDB.connection.raw(`SELECT * FROM Novas_obras`);
                console.log("obras", result);
                return result[0];
            }
            catch (error) {
            }
        });
    }
}
exports.default = ApartmentsDB;
//# sourceMappingURL=ApartmentsDB.js.map