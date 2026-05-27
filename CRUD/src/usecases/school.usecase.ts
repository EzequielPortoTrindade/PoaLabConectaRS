import { Escola, EscolaCreate, EscolaRepository } from "../interfaces/school.interface.js";

class EscolaUseCase {
    // 1. Recebemos o repositório pelo construtor (Injeção de Dependência)
    constructor(private escolaRepo: EscolaRepository) {}

    // Criar uma nova escola
    async create({ nome, rua, numero, bairro, id_localizacao }: EscolaCreate): Promise<Escola> {
        // Validação usando o método do repositório para evitar duplicidade na mesma região
        const verifyIfEscolaExists = await this.escolaRepo.findByNameAndLocal(nome, id_localizacao);

        if (verifyIfEscolaExists) {
            throw new Error("Escola already exists");
        }

        return await this.escolaRepo.create({ nome, rua, numero, bairro, id_localizacao });
    }

    // Buscar escola por ID
    async findById(id_escola: number): Promise<Escola | null> {
        return await this.escolaRepo.findById(id_escola);
    }

    async findByNameAndLocal(nome: string, id_localizacao: number): Promise<Escola | null> {
        return await this.escolaRepo.findByNameAndLocal(nome, id_localizacao);
    }

    // Deletar escola
    async delete(id_escola: number): Promise<Escola> {
        const escolaExists = await this.escolaRepo.findById(id_escola);

        if (!escolaExists) {
            throw new Error("Escola not found");
        }

        return await this.escolaRepo.delete(id_escola);
    }
}

export { EscolaUseCase };