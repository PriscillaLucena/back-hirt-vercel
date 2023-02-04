import Construction from "../model/constructions";

export default interface ConstructionsRepository{
    GetConstructionsById(id: string): Promise<Construction| undefined>
}