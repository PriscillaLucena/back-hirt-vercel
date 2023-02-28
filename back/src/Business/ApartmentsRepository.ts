import { inputApDTO } from "./ApartmentsBusiness";

export default interface ApartmentsRepository {
    GetApartmentsById(input: inputApDTO, id: string): Promise<any>
}