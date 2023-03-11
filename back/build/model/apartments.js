"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApartmentNew = void 0;
class Apartment {
    constructor(ap_number, floor, cleaned, data, foto, construc_id, user_id) { }
}
class ApartmentNew extends Apartment {
    constructor(id, ap_number, floor, cleaned, data, foto, construc_id, user_id) {
        super(ap_number, floor, cleaned, data, foto, construc_id, user_id);
        this.id = id;
        this.ap_number = ap_number;
        this.floor = floor;
        this.cleaned = cleaned;
        this.data = data;
        this.foto = foto;
        this.construc_id = construc_id;
        this.user_id = user_id;
    }
    static toApartmentNewModel(input) {
        return new ApartmentNew(input.id, input.ap_number, input.floor, input.cleaned, input.data, input.foto, input.construc_id, input.user_id);
    }
}
exports.ApartmentNew = ApartmentNew;
//# sourceMappingURL=apartments.js.map