import { Localizacao, LocalCreate, LocalRepository } from "../../../shared/local.interface.js";

class LocalUseCase {
    // Injeção de Dependência do Repositório
    constructor(private localRepo: LocalRepository) {}

    // 1. Criar um novo local
    async create({ nome_cidade, uf }: LocalCreate): Promise<Localizacao> {
        const verifyIfLocalExists = await this.localRepo.findByNameAndUF(nome_cidade, uf);
        
        if (verifyIfLocalExists) {
            throw new Error('Local already exists');
        }
        
        return await this.localRepo.create({ nome_cidade, uf });
    }

    // 2. Buscar por ID
    async findById(id_localizacao: number): Promise<Localizacao | null> {
        return await this.localRepo.findById(id_localizacao);
    }

    // 3. Buscar por Nome e UF
    async findByNameAndUF(nome_cidade: string, uf: string): Promise<Localizacao | null> {
        return await this.localRepo.findByNameAndUF(nome_cidade, uf);
    }

    async findAll(): Promise<Localizacao[]> {
        return this.localRepo.findAll();
    }

    // 4. Deletar local
    async delete(id_localizacao: number): Promise<Localizacao> {
        const localExists = await this.localRepo.findById(id_localizacao);

        if (!localExists) {
            throw new Error("Local not found");
        }

        return await this.localRepo.delete(id_localizacao);
    }
}

export { LocalUseCase };