"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConstructionNew = void 0;
class Construc {
    constructor(nome_obra, qty_andares, qty_ap_andar, responsavel) { }
}
class Construction extends Construc {
    constructor(obra_id, nome_obra, qty_andares, qty_ap_andar, responsavel, apartamentos) {
        super(nome_obra, qty_andares, qty_ap_andar, responsavel);
        this.obra_id = obra_id;
        this.nome_obra = nome_obra;
        this.qty_andares = qty_andares;
        this.qty_ap_andar = qty_ap_andar;
        this.responsavel = responsavel;
        this.apartamentos = apartamentos;
    }
    static toConstructionModel(input) {
        return new Construction(input.obra_id, input.nome_obra, input.qty_andares, input.qty_ap_andar, input.responsavel, input.apartamentos);
    }
}
exports.default = Construction;
class ConstructionNew extends Construc {
    constructor(id, nome_obra, qty_andares, qty_ap_andar, qty_total_ap, responsavel) {
        super(nome_obra, qty_andares, qty_ap_andar, responsavel);
        this.id = id;
        this.nome_obra = nome_obra;
        this.qty_andares = qty_andares;
        this.qty_ap_andar = qty_ap_andar;
        this.qty_total_ap = qty_total_ap;
        this.responsavel = responsavel;
    }
    static toConstructionNewModel(input) {
        return new ConstructionNew(input.id, input.nome_obra, input.qty_andares, input.qty_ap_andar, input.qty_total_ap, input.responsavel);
    }
    GetId() {
        return this.id;
    }
    GetNome_obra() {
        return this.nome_obra;
    }
    GetQty_andares() {
        return this.qty_andares;
    }
    GetQty_ap_andar() {
        return this.qty_ap_andar;
    }
    GetQty_Total_ap() {
        return this.qty_total_ap;
    }
    GetResponsavel() {
        return this.responsavel;
    }
}
exports.ConstructionNew = ConstructionNew;
//# sourceMappingURL=constructions.js.map