import { prisma } from "../db/prisma-client.js";
import { Escola, EscolaCreate, EscolaRepository } from "../interfaces/school.interface.js";

class EscolaRepoPrisma implements EscolaRepository{
    async create(data: EscolaCreate): Promise<Escola> {
        const result = await prisma.escola.create({
            data: {
                nome: data.nome,
                rua: data.rua,
                numero: data.numero,
                bairro: data.bairro,
                id_localizacao: data.id_localizacao
            }
        });
        return result;
    }

    async findByName(nome: string): Promise<Escola | null> {
        const result = await prisma.escola.findFirst({
            where: {
                nome
            }
        });
        return result;
    }

    async findById(id_escola: number): Promise<Escola | null> {
        const result = await prisma.escola.findFirst({
            where: {
                id_escola
            }
        });
        return result;
    }

    async delete(id_escola: number): Promise<Escola | null> {
                const exists = await prisma.escola.findFirst({
                    where: { id_escola }
                });
        
                if (!exists) return null;
        
                const result = await prisma.escola.delete({
                    where: { id_escola }
                });
        
                return result;
            }
}

export { EscolaRepoPrisma };