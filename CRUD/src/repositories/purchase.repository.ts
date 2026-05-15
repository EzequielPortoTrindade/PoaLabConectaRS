import { Compra, CompraCreate, CompraRepository } from "../interfaces/purchase.interface.js";

class CompraRepoPrisma implements CompraRepository{
    async create(data: CompraCreate): Promise<Compra> {}
}

export { CompraRepoPrisma };