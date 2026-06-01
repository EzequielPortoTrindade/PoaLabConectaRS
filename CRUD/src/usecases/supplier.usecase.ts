import { Fornecedor, FornecedorCreate, FornecedorRepository } from "../interfaces/supplier.interface.js";

class FornecedorUseCase {

    // Injeção de dependência via construtor (padrão UserRepository)
    constructor(private fornecedorRepo: FornecedorRepository) {}

    // CREATE - Criar um novo fornecedor
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

        return await this.fornecedorRepo.create({
            cnpj,
            nome,
            telefone,
            email,
            website,
            id_localizacao
        });
    }

    // FIND BY CNPJ - Buscar fornecedor pelo CNPJ
    async findByCNPJ(cnpj: string): Promise<Fornecedor | null> {
        return await this.fornecedorRepo.findByCNPJ(cnpj);
    }

    // FIND BY ID - Buscar fornecedor pelo ID
    async findById(id_fornecedor: number): Promise<Fornecedor | null> {
        return await this.fornecedorRepo.findById(id_fornecedor);
    }

    // DELETE - Deletar um fornecedor
    async delete(id_fornecedor: number): Promise<Fornecedor> {
        
        const fornecedorExists = await this.fornecedorRepo.findById(id_fornecedor);

        if (!fornecedorExists) {
            throw new Error("Fornecedor not found"); 
        }

        const deleted = await this.fornecedorRepo.delete(id_fornecedor);

        if (!deleted) {
            throw new Error("Fornecedor not found");
        }

        return deleted;
    }
}

export { FornecedorUseCase };