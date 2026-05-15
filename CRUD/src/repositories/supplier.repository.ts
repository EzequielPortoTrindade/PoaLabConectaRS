import { Fornecedor, FornecedorCreate, FornecedorRepository } from "../interfaces/supplier.interface.js";

class FornecedorRepoPrisma implements FornecedorRepository{
    async create(data: FornecedorCreate): Promise<Fornecedor> {}
}

export { FornecedorRepoPrisma };