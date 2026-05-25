import { Escola, EscolaCreate, EscolaRepository } from "../interfaces/school.interface.js";
import { EscolaRepoPrisma } from "../repositories/school.repository.js";

class EscolaUseCase {
    private escolaRepo: EscolaRepository;

    constructor() {
        this.escolaRepo = new EscolaRepoPrisma();
    }

    async create({
        nome,
        rua,
        numero,
        bairro,
        id_localizacao
    }: EscolaCreate): Promise<Escola> {

        const verifyIfEscolaExists = await this.escolaRepo.findByName(nome);

        if (verifyIfEscolaExists) {
            throw new Error("Escola already exists");
        }

        const result = await this.escolaRepo.create({
            nome,
            rua,
            numero,
            bairro,
            id_localizacao
        });

        return result;
    }
}

export { EscolaUseCase };