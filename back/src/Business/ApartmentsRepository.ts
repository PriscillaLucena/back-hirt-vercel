import { inputApDTO } from "./ApartmentsBusiness";

export default interface ApartmentsRepository {
    GetApartmentsById(input: inputApDTO): Promise<any>
}