import { Saida, SaidaCreate, SaidaRepository } from "../interfaces/log.interface.js";
import { SaidaRepoPrisma } from "../repositories/log.repository.js";

class SaidaUseCase {
    private saidaRepo: SaidaRepository;

    constructor() {
        this.saidaRepo = new SaidaRepoPrisma();
    }

    async create({
        descricao,
        data_saida,
        id_usuario,
        id_item,
        id_escola
    }: SaidaCreate): Promise<Saida> {

        const result = await this.saidaRepo.create({
            descricao,
            data_saida,
            id_usuario,
            id_item,
            id_escola
        });

        return result;
    }

    async delete(id_log: number): Promise<Saida> {
        const deleted = await this.saidaRepo.delete(id_log);

        if (!deleted) {
            throw new Error("Saida not found");
        }

        return deleted;
    }
}

export { SaidaUseCase };