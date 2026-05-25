import { Fornecedor, FornecedorCreate, FornecedorRepository } from "../interfaces/supplier.interface.js";
import { FornecedorRepoPrisma } from "../repositories/supplier.repository.js";

class FornecedorUseCase {
    private fornecedorRepo: FornecedorRepository;

    constructor() {
        this.fornecedorRepo = new FornecedorRepoPrisma();
    }

    async create({
        cnpj,
        nome,
        telefone,
        email,
        website,
        id_localizacao
    }: FornecedorCreate): Promise<Fornecedor> {

        const verifyIfFornecedorExists = await this.fornecedorRepo.findByCNPJ(cnpj);

        if (verifyIfFornecedorExists) {
            throw new Error("Fornecedor already exists");
        }

        const result = await this.fornecedorRepo.create({
            cnpj,
            nome,
            telefone,
            email,
            website,
            id_localizacao
        });

        return result;
    }
}

export { FornecedorUseCase };