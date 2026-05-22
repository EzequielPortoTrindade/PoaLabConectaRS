import { prisma } from "../db/prisma-client.js";
import { Compra, CompraCreate, CompraRepository } from "../interfaces/purchase.interface.js";

class CompraRepoPrisma implements CompraRepository{
    async create(data: CompraCreate): Promise<Compra> {
        const result = await prisma.compra.create({
            data: {
                quantidade
            }
        });
    }
}

export { CompraRepoPrisma };