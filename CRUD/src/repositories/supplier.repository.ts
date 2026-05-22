import { prisma } from "../db/prisma-client.js";
import { Fornecedor, FornecedorCreate, FornecedorRepository } from "../interfaces/supplier.interface.js";

class FornecedorRepoPrisma implements FornecedorRepository{
    async create(data: FornecedorCreate): Promise<Fornecedor> {
        const result = await prisma.fornecedor.create({
            data: {
               cnpj: data.cnpj,
               nome: data.nome,
               telefone: data.telefone,
               email: data.email,
               website: data.website,
               id_localizacao: data.id_localizacao
            }
        });
        return result;
    }

    async findByCNPJ(cnpj: string): Promise<Fornecedor | null> {
        const result = await prisma.fornecedor.findFirst({
            where: {
                cnpj
            }
        });
        return result || null;
    }
}

export { FornecedorRepoPrisma };