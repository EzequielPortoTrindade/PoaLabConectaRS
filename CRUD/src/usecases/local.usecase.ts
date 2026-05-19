import { Localizacao, LocalCreate, LocalRepository } from "../interfaces/local.interface.js";
import { LocalRepoPrisma } from "../repositories/local.repository.js";

class LocalUseCase {
    private localRepo: LocalRepository
    constructor(){
        this.localRepo = new LocalRepoPrisma()
    }

    async create({nome_cidade, uf}: LocalCreate): Promise<Localizacao> {
        const verifyIfUserExists = await this.localRepo.findByNameAndUF(nome_cidade, uf);
        if(verifyIfUserExists) {
            throw new Error('Local already exists');
        }
        const result = await this.localRepo.create({ nome_cidade, uf});
        return result;
    }
}

export { LocalUseCase };