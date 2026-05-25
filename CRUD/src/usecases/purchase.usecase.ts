import { Compra, CompraCreate, CompraRepository } from "../interfaces/purchase.interface.js";
import { CompraRepoPrisma } from "../repositories/purchase.repository.js";

class CompraUseCase {
    private compraRepo: CompraRepository;

    constructor() {
        this.compraRepo = new CompraRepoPrisma();
    }

    async create({
        quantidade,
        data_compra,
        valor_unitario,
        marca,
        nota_fiscal,
        id_usuario,
        id_fornecedor,
        id_item,
        id_escola
    }: CompraCreate): Promise<Compra> {

        /*const verifyIfCompraExists = await this.compraRepo.findById(id_compra);

        if (verifyIfCompraExists) {
            throw new Error("Fornecedor already exists");
        }*/

        const result = await this.compraRepo.create({
            quantidade,
            data_compra,
            valor_unitario,
            marca,
            nota_fiscal,
            id_usuario,
            id_fornecedor,
            id_item,
            id_escola
        });

        return result;
    }
}

export { CompraUseCase };