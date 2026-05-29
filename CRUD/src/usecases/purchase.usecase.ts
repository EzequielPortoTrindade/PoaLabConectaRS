import { Compra, CompraCreate, CompraRepository } from "../interfaces/purchase.interface.js";

class CompraUseCase {

    // Injeção de dependência via construtor (estilo TypeScript abreviado)
    constructor(private compraRepo: CompraRepository) {}

    // CREATE - Criar uma nova compra
    async create({
        quantidade,
        data_compra,
        valor_unitario,
        marca,
        nota_fiscal,
        id_usuario,
        id_fornecedor,
        id_itemConsumo,
        id_itemCapital,
        id_escola
    }: CompraCreate): Promise<Compra> {
        
        // Se no futuro você quiser validar duplicidade ou dados, a lógica entra aqui.

        return await this.compraRepo.create({
            quantidade,
            data_compra,
            valor_unitario,
            marca,
            nota_fiscal,
            id_usuario,
            id_fornecedor,
            id_itemConsumo,
            id_itemCapital,
            id_escola
        });
    }

    // FIND BY ID - Buscar compra por ID
    async findById(id_compra: number): Promise<Compra | null> {
        return await this.compraRepo.findById(id_compra);
    }

    // DELETE - Deletar uma compra
    async delete(id_compra: number): Promise<Compra> {
        const compraExists = await this.compraRepo.findById(id_compra);

        if (!compraExists) {
            throw new Error("Compra not found"); 
        }

        const deletedCompra = await this.compraRepo.delete(id_compra);
        
        if (!deletedCompra) {
            throw new Error("Compra not found");
        }

        return deletedCompra;
    }
}

export { CompraUseCase };