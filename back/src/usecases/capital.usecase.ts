import { Item_Capital, ItemCapitalCreate, ItemCapitalRepository } from "../../../shared/capital.interface.js";

class ItemCapitalUseCase {

    constructor(private itemCapitalRepo: ItemCapitalRepository) {}

    // CREATE - Criar um novo item de capital com validação de patrimônio
    async create({
        nome,
        emprestimo,
        descricao,
        id_escola,
        id_fornecedor,
        num_patrimonio
    }: ItemCapitalCreate): Promise<Item_Capital> {
        
        const verifyIfPatrimonioExists = await this.itemCapitalRepo.findByNumPatrimonio(num_patrimonio);

        if (verifyIfPatrimonioExists) {
            throw new Error("Item Capital already exists"); 
        }

        return await this.itemCapitalRepo.create({
            nome,
            emprestimo,
            descricao,
            id_escola,
            id_fornecedor,
            num_patrimonio
        });
    }

    // FIND BY NUM PATRIMONIO - Buscar item pelo número do patrimônio
    async findByNumPatrimonio(num_patrimonio: string): Promise<Item_Capital | null> {
        return await this.itemCapitalRepo.findByNumPatrimonio(num_patrimonio);
    }

    // FIND BY ID - Buscar item pelo ID
    async findById(id_itemCapital: number): Promise<Item_Capital | null> {
        return await this.itemCapitalRepo.findById(id_itemCapital);
    }

    async findAll(): Promise<Item_Capital[]> {
        return this.itemCapitalRepo.findAll();
    }

    // DELETE - Deletar um item de capital
    async delete(id_itemCapital: number): Promise<Item_Capital> {
        
        const itemExists = await this.itemCapitalRepo.findById(id_itemCapital);

        if (!itemExists) {
            throw new Error("Item Capital not found"); 
        }

        const deleted = await this.itemCapitalRepo.delete(id_itemCapital);

        if (!deleted) {
            throw new Error("Item Capital not found");
        }

        return deleted;
    }
}

export { ItemCapitalUseCase };