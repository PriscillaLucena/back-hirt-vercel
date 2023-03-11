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
class ConstructionController {
    constructor(constructionsBusiness) {
        this.constructionsBusiness = constructionsBusiness;
        this.GetApartments = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const input = {
                token: req.headers.authorization,
                id: req.params.id
            };
            try {
                const apartments = yield this.constructionsBusiness.GetApartments(input);
                res.status(200).send({ apartments });
            }
            catch (error) {
                let message = error.sqlMessage || error.message;
                res.statusCode = 400;
                res.send({ message });
            }
        });
        this.GetAllConstructions = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const input = {
                token: req.headers.authorization
            };
            try {
                const allConstructions = yield this.constructionsBusiness.GetAllConstructions(input);
                res.status(200).send({ allConstructions });
            }
            catch (error) {
                res.status(400).send(error.message);
            }
        });
        this.InsertApartments = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const input = {
                token: req.headers.authorization,
                id: req.params.obra_id
            };
            const { numero_ap, andar, limpeza_completa, foto } = req.body;
            const ap = {
                numero_ap: numero_ap, andar: andar, limpeza_completa: limpeza_completa, foto: foto
            };
            try {
                console.log(input.id);
                const result = yield this.constructionsBusiness.InsertApartments(input, ap);
                res.status(200).send({ result });
            }
            catch (error) {
                res.status(400).send(error.message);
            }
        });
        this.InsertNewConstructions = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const input = {
                token: req.headers.authorization
            };
            const body = req.body;
            console.log(body);
            try {
                const message = yield this.constructionsBusiness.InsertNewConstructions(input, body);
                res.status(200).send({ message });
            }
            catch (error) {
                res.status(400).send(error.message);
            }
        });
        this.EditConstruction = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const input = {
                token: req.headers.authorization
            };
            const body = req.body;
            const id = req.params.id;
            try {
                const message = yield this.constructionsBusiness.EditConstructions(input, id, body);
                res.status(200).send({ message });
            }
            catch (error) {
                res.status(400).send(error.message);
            }
        });
    }
}
exports.default = ConstructionController;
//# sourceMappingURL=ConstructionsController.js.map