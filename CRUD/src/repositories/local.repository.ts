import { Localizacao, LocalCreate, LocalRepository } from "../interfaces/local.interface.js";

class LocalRepoPrisma implements LocalRepository{
    async create(data: LocalCreate): Promise<Localizacao> {}
}

export { LocalRepoPrisma };