import { prisma } from "../db/prisma-client.js";
import { Saida, SaidaCreate, SaidaRepository } from "../interfaces/log.interface.js";

class SaidaRepoPrisma implements SaidaRepository {

    async create(data: SaidaCreate): Promise<Saida> {
        const result = await prisma.log_Saidas.create({
            data: {
                descricao: data.descricao,
                data_saida: data.data_saida,
                id_usuario: data.id_usuario,
                id_itemCapital: data.id_itemCapital,
                id_itemConsumo: data.id_itemConsumo,
                id_escola: data.id_escola
            }
        });

        return result;
    }

    async findById(id_log: number): Promise<Saida | null> {
        const result = await prisma.log_Saidas.findUnique({
            where: {
                id_log
            }
        });
        return result;
    }

    async delete(id_log: number): Promise<Saida | null> {
        const exists = await prisma.log_Saidas.findFirst({
            where: { id_log }
        });

        if (!exists) return null;

        const result = await prisma.log_Saidas.delete({
            where: { id_log }
        });

        return result;
    }
}

export { SaidaRepoPrisma };