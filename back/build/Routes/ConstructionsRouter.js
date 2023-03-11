"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConstructionsRouter = void 0;
const express_1 = __importDefault(require("express"));
const ConstructionsBusiness_1 = __importDefault(require("../Business/ConstructionsBusiness"));
const ConstructionsController_1 = __importDefault(require("../Controller/ConstructionsController"));
const ConstructionsDB_1 = __importDefault(require("../Data/ConstructionsDB"));
const Authenticator_1 = __importDefault(require("../services/Authenticator"));
const GenerateId_1 = __importDefault(require("../services/GenerateId"));
exports.ConstructionsRouter = express_1.default.Router();
const constructionController = new ConstructionsController_1.default(new ConstructionsBusiness_1.default(new Authenticator_1.default(), new ConstructionsDB_1.default(), new GenerateId_1.default()));
exports.ConstructionsRouter.post("/new", constructionController.InsertNewConstructions);
exports.ConstructionsRouter.post("/:obra_id", constructionController.InsertApartments);
exports.ConstructionsRouter.put("/editConstruction/:id", constructionController.EditConstruction);
exports.ConstructionsRouter.get("/info/:id", constructionController.GetApartments);
exports.ConstructionsRouter.get("/all", constructionController.GetAllConstructions);
//# sourceMappingURL=ConstructionsRouter.js.map