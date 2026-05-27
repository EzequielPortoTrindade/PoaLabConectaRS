import { Item_Consumo, ItemConsumoCreate, ItemConsumoRepository } from "../interfaces/consumo.interface.js";
import { ItemConsumoRepoPrisma } from "../repositories/consumo.repository.js";

class ItemConsumoUseCase {
    private itemConRepo: ItemConsumoRepository;

    constructor() {
        this.itemConRepo = new ItemConsumoRepoPrisma();
    }

    async create({
        quantidade,
        nome,
        descricao,
        id_escola,
        id_fornecedor
    }: ItemConsumoCreate): Promise<Item_Consumo> {

        const verifyIfItemExists = await this.itemConRepo.findByName(nome);

        if (verifyIfItemExists) {
            throw new Error("Item already exists");
        }

        const result = await this.itemConRepo.create({
            quantidade,
            nome,
            descricao,
            id_escola,
            id_fornecedor,
        });

        return result;
    }
}

export { ItemConsumoUseCase };