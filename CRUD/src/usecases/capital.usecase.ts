import { Item_Capital, ItemCapitalCreate, ItemCapitalRepository } from "../interfaces/capital.interface.js";
import { ItemCapitalRepoPrisma } from "../repositories/capital.repository.js";

class ItemCapitalUseCase {
    private itemCapRepo: ItemCapitalRepository;

    constructor() {
        this.itemCapRepo = new ItemCapitalRepoPrisma();
    }

    async create({
        nome,
        descricao,
        id_escola,
        id_fornecedor,
        num_patrimonio
    }: ItemCapitalCreate): Promise<Item_Capital> {

        const verifyIfItemExists = await this.itemCapRepo.findByNumPatrimonio(num_patrimonio);

        if (verifyIfItemExists) {
            throw new Error("Item already exists");
        }

        const result = await this.itemCapRepo.create({
            nome,
            descricao,
            id_escola,
            id_fornecedor,
            num_patrimonio
        });

        return result;
    }
}

export { ItemCapitalUseCase };