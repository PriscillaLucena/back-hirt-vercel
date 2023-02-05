export default class Construction{
    
    constructor(
        private obra_id: string,
        private nome_obra: string,
        private qty_andares: number,
        private qty_ap_andar: number,
        private responsavel: string,
        private apartamentos: apartamento[]
    ){}
        static toConstructionModel(input: any): Construction {
            return new Construction(input.obra_id, 
                input.nome_obra, 
                input.qty_andares,
                input.qty_ap_andar,
                input.responsavel,
                input.apartamentos)
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

