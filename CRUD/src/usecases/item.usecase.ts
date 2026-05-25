import { Item, ItemCreate, ItemRepository } from "../interfaces/item.interface.js";
import { ItemRepoPrisma } from "../repositories/item.repository.js";

class ItemUseCase {
    private itemRepo: ItemRepository;

    constructor() {
        this.itemRepo = new ItemRepoPrisma();
    }

    async create({
        quantidade,
        nome,
        categoria,
        descricao,
        id_escola,
        id_fornecedor,
        num_patrimonio
    }: ItemCreate): Promise<Item> {

        const verifyIfItemExists = await this.itemRepo.findByName(nome);

        if (verifyIfItemExists) {
            throw new Error("Item already exists");
        }

        const result = await this.itemRepo.create({
            quantidade,
            nome,
            categoria,
            descricao,
            id_escola,
            id_fornecedor,
            num_patrimonio
        });

        return result;
    }
}

export { ItemUseCase };