abstract class Apartment{
    constructor(
        ap_number: number,
        floor: number,
        cleaned: number,
        data: string,
        foto: string | null,
        construc_id: string,
        user_id: string
    ){}
}

export class ApartmentNew extends Apartment{
    constructor(
        private id: string,
        private ap_number: number,
        private floor: number,
        private cleaned: number,
        private data: string,
        private foto: string | null,
        private construc_id: string,
        private user_id: string
    ){
        super(ap_number, floor, cleaned, data, foto, construc_id, user_id)
    }

    static toApartmentNewModel(input: any): ApartmentNew {
        return new ApartmentNew(
            input.id, 
            input.ap_number, 
            input.floor,
            input.cleaned,
            input.data,
            input.foto,
            input.construc_id,
            input.user_id
            )
    }

}

