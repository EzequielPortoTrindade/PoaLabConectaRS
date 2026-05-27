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

    async findById(id_fornecedor: number): Promise<Fornecedor | null>{
            const result = await prisma.fornecedor.findFirst({
                where: {
                    id_fornecedor
                }
            });
            return result || null;
        }
    
    async delete(id_fornecedor: number): Promise<Fornecedor | null> {
            const exists = await prisma.fornecedor.findFirst({
                where: { id_fornecedor }
            });
    
            if (!exists) return null;
    
            const result = await prisma.fornecedor.delete({
                where: { id_fornecedor }
            });
    
            return result;
        }
}

export { FornecedorRepoPrisma };