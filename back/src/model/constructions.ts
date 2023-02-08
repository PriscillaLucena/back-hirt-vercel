class Construc {
    constructor(
    
    nome_obra: string,
    qty_andares: number,
    qty_ap_andar: number,
    responsavel: string,
    ){}
}

export default class Construction extends Construc{
    
    constructor(
        private obra_id: string,
        private nome_obra: string,
        private qty_andares: number,
        private qty_ap_andar: number,
        private responsavel: string,
        private apartamentos: apartamento[]
    ){
        super(nome_obra, qty_andares, qty_ap_andar, responsavel)
    }
        static toConstructionModel(input: any): Construction {
            return new Construction(
                input.obra_id, 
                input.nome_obra, 
                input.qty_andares,
                input.qty_ap_andar,
                input.responsavel,
                input.apartamentos)
        }

}

export class ConstructionNew extends Construc{
    
    constructor(
        private id: string,
        private nome_obra: string,
        private qty_andares: number,
        private qty_ap_andar: number,
        private qty_total_ap: number,
        private responsavel: string,
    ){
        super( nome_obra, qty_andares, qty_ap_andar, responsavel)
    }
        static toConstructionNewModel(input: any): ConstructionNew {
            return new ConstructionNew(
                input.id, 
                input.nome_obra, 
                input.qty_andares,
                input.qty_ap_andar,
                input.qty_total_ap,
                input.responsavel
                )
        }

        public GetId() {
            return this.id
        }
        public GetNome_obra() {
            return this.nome_obra
        }
        public GetQty_andares() {
            return this.qty_andares
        }
        public GetQty_ap_andar() {
            return this.qty_ap_andar
        }
        public GetQty_Total_ap() {
            return this.qty_total_ap
        }
        public GetResponsavel() {
            return this.responsavel
        }

}

export type apartamento = {
    id: string,
    numero_ap: number,
    andar: number,
    limpeza_completa: boolean,
    data: string,
    foto: string,
    obra_id: string
}

