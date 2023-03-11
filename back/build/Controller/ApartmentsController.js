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
class ApartmentsController {
    constructor(apartmentBusiness) {
        this.apartmentBusiness = apartmentBusiness;
        this.VerifyImg = (file) => {
            if (file) {
                return true;
            }
            else {
                return false;
            }
        };
        this.GetApartmensById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const input = {
                token: req.headers.authorization,
                id: req.params.id
            };
            const obra_id = req.params.obra_id;
            console.log("obra id", obra_id);
            try {
                console.log("iniciei o controller");
                const apartments = yield this.apartmentBusiness.GetApartmentsById(input, obra_id);
                res.status(200).send({ apartments });
            }
            catch (error) {
            }
        });
        this.GetConstrucById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const input = {
                token: req.headers.authorization,
                id: req.params.id
            };
            try {
                console.log("iniciei o controller");
                const apartments = yield this.apartmentBusiness.GetConstrucById(input);
                res.status(200).send({ apartments });
            }
            catch (error) {
            }
        });
        this.GetAllConstructions = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const input = {
                token: req.headers.authorization
            };
            try {
                const apartments = yield this.apartmentBusiness.GetAllConstructions(input);
                res.status(200).send({ apartments });
            }
            catch (error) {
                res.status(400).send(error.message);
            }
        });
        this.NewApartment = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const input = {
                token: req.headers.authorization,
                id: req.params.id
            };
            const body = {
                numero_ap: req.body.numero_ap,
                andar: req.body.andar,
                limpeza_completa: req.body.limpeza_completa,
                foto: req.body.file,
                obra_id: req.body.obra_id,
                user_id: input.id
            };
            console.log(body);
            const verify = this.VerifyImg(req.body.file);
            console.log(verify);
            try {
                const result = yield this.apartmentBusiness.NewApartment(body, input);
            }
            catch (error) {
            }
        });
        this.EditClean = (req, res) => __awaiter(this, void 0, void 0, function* () {
            console.log("iniciei as fotos");
            if (req.file) {
                return res.json({
                    erro: false,
                    mensagem: "upload realizado com sucesso"
                });
            }
            return res.status(400).json({
                erro: true,
                mesnagem: "Erro: upload não realizado"
            });
        });
    }
}
exports.default = ApartmentsController;
//# sourceMappingURL=ApartmentsController.js.map