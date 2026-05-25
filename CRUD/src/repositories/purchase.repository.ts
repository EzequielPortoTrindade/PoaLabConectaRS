import { prisma } from "../db/prisma-client.js";
import { Compra, CompraCreate, CompraRepository } from "../interfaces/purchase.interface.js";

class CompraRepoPrisma implements CompraRepository {

    async create(data: CompraCreate): Promise<Compra> {
        const result = await prisma.compra.create({
            data: {
                quantidade: data.quantidade,
                data_compra: data.data_compra,
                valor_unitario: data.valor_unitario,
                marca: data.marca,
                nota_fiscal: data.nota_fiscal,
                id_usuario: data.id_usuario,
                id_fornecedor: data.id_fornecedor,
                id_item: data.id_item,
                id_escola: data.id_escola
            }
        });

        return result;
    }

    async findById(id_compra: number): Promise<Compra | null> {
        const result = await prisma.compra.findFirst({
            where: {
                id_compra
            }
        });
        return result;
    }
}

export { CompraRepoPrisma };