import { Item, ItemCreate, ItemRepository } from "../interfaces/item.interface.js";

class ItemRepoPrisma implements ItemRepository{
    async create(data: ItemCreate): Promise<Item> {}
}

export { ItemRepoPrisma };