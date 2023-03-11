"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.apartmentsRouter = void 0;
const express_1 = __importDefault(require("express"));
const ApartmentsBusiness_1 = __importDefault(require("../Business/ApartmentsBusiness"));
const ApartmentsController_1 = __importDefault(require("../Controller/ApartmentsController"));
const ApartmentsDB_1 = __importDefault(require("../Data/ApartmentsDB"));
const Authenticator_1 = __importDefault(require("../services/Authenticator"));
const GenerateId_1 = __importDefault(require("../services/GenerateId"));
const uploadUser = require("../../middlewares/uploadImage");
exports.apartmentsRouter = express_1.default.Router();
const apartmentsController = new ApartmentsController_1.default(new ApartmentsBusiness_1.default(new Authenticator_1.default, new ApartmentsDB_1.default, new GenerateId_1.default));
exports.apartmentsRouter.get("/all/:id/:obra_id", apartmentsController.GetApartmensById);
exports.apartmentsRouter.get("/construc/:id", apartmentsController.GetConstrucById);
exports.apartmentsRouter.get("/constructions/all", apartmentsController.GetAllConstructions);
exports.apartmentsRouter.post("/newAp", uploadUser.single('avatar'), apartmentsController.NewApartment);
exports.apartmentsRouter.post("/fotos", uploadUser.array('avatar'), apartmentsController.EditClean);
//# sourceMappingURL=ApartmentsRouter.js.map