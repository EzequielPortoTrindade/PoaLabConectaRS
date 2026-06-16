import { Item_Consumo, ItemConsumoCreate, ItemConsumoRepository } from "../../../shared/consumo.interface.js";

class ItemConsumoUseCase {

    constructor(private itemConsumoRepo: ItemConsumoRepository) {}

    // CREATE - Criar um novo item de consumo
    async create({
        quantidade,
        nome,
        emprestimo,
        descricao,
        id_escola,
        id_fornecedor
    }: ItemConsumoCreate): Promise<Item_Consumo> {
        
        const verifyIfItemExists = await this.itemConsumoRepo.findByName(nome);

        if (verifyIfItemExists) {
            throw new Error("Item Consumo already exists"); 
        }

        return await this.itemConsumoRepo.create({
            quantidade,
            nome,
            emprestimo,
            descricao,
            id_escola,
            id_fornecedor
        });
    }

    // FIND BY NAME - Buscar item de consumo pelo nome
    async findByName(nome: string): Promise<Item_Consumo | null> {
        return await this.itemConsumoRepo.findByName(nome);
    }

    // FIND BY ID - Buscar item de consumo pelo ID
    async findById(id_itemConsumo: number): Promise<Item_Consumo | null> {
        return await this.itemConsumoRepo.findById(id_itemConsumo);
    }

    async findAll(): Promise<Item_Consumo[]> {
            return this.itemConsumoRepo.findAll();
        }

    // DELETE - Deletar um item de consumo
    async delete(id_itemConsumo: number): Promise<Item_Consumo> {
        const itemExists = await this.itemConsumoRepo.findById(id_itemConsumo);

        if (!itemExists) {
            throw new Error("Item Consumo not found");
        }

        const deleted = await this.itemConsumoRepo.delete(id_itemConsumo);

        if (!deleted) {
            throw new Error("Item Consumo not found");
        }

        return deleted;
    }
}

export { ItemConsumoUseCase };