import Construction, { apartamento } from "../model/constructions";

export default interface ConstructionsRepository{
    GetConstructionsById(id: string): Promise<Construction| undefined>

    GetConstructions(): Promise<any>

    InsertApartments(body: apartamento): Promise<string | undefined>

    EditConstructions(field: string, body: any, id: string): Promise<string | undefined>
}