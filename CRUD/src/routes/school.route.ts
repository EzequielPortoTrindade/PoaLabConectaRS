import { FastifyInstance } from "fastify";
import { EscolaUseCase } from "../usecases/school.usecase.js";
import { EscolaCreate } from "../interfaces/school.interface.js";
import { EscolaRepoPrisma } from "../repositories/school.repository.js"; // Importa o repositório

export async function escolaRoutes(fastify: FastifyInstance) {
    const escolaRepo = new EscolaRepoPrisma();
    const escolaUseCase = new EscolaUseCase(escolaRepo); 

    // POST - Criar Escola
    fastify.post<{ Body: EscolaCreate }>('/', async (req, reply) => {
        try {
            const data = await escolaUseCase.create(req.body);
            return reply.status(201).send(data);
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Erro interno';
            if (message === 'Escola already exists') return reply.status(409).send({ message });
            return reply.status(500).send({ message });
        }
    });

    // DELETE - Deletar Escola
    fastify.delete<{ Params: { id: string } }>('/:id', async (req, reply) => {
        try {
            const id = Number(req.params.id);
            if (isNaN(id)) return reply.status(400).send({ message: 'ID inválido' });

            const deletedEscola = await escolaUseCase.delete(id);
            return reply.status(200).send(deletedEscola);
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Erro';
            return reply.status(message === 'Escola not found' ? 404 : 500).send({ message });
        }
    });
}