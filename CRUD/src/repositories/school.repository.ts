import { Escola, EscolaCreate, EscolaRepository } from "../interfaces/school.interface.js";

class EscolaRepoPrisma implements EscolaRepository{
    async create(data: EscolaCreate): Promise<Escola> {}
}

export { EscolaRepoPrisma };