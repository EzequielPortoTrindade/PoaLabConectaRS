import { Saida, SaidaCreate, SaidaRepository } from "../interfaces/log.interface.js";

class SaidaUseCase {

    // Injeção de dependência via construtor (estilo TypeScript limpo)
    constructor(private saidaRepo: SaidaRepository) {}

    // CREATE - Criar um novo log de saída
    async create({
        descricao,
        data_saida,
        id_usuario,
        id_itemCapital,
        id_itemConsumo,
        id_escola
    }: SaidaCreate): Promise<Saida> {

        return await this.saidaRepo.create({
            descricao,
            data_saida,
            id_usuario,
            id_itemCapital,
            id_itemConsumo,
            id_escola
        });
    }

    // FIND BY ID - Buscar log de saída por ID
    async findById(id_log: number): Promise<Saida | null> {
        return await this.saidaRepo.findById(id_log);
    }

    async findAll(): Promise<Saida[]> {
        return this.saidaRepo.findAll();
    }

    // DELETE - Deletar um log de saída
    async delete(id_log: number): Promise<Saida> {

        const saidaExists = await this.saidaRepo.findById(id_log);

        if (!saidaExists) {
            throw new Error("Saida not found"); 
        }

        const deleted = await this.saidaRepo.delete(id_log);

        if (!deleted) {
            throw new Error("Saida not found");
        }

        return deleted;
    }
}

export { SaidaUseCase };